import {useEffect} from 'react';
import {MutationFunction, useMutation, useQuery} from '@tanstack/react-query';

import {
  ResponseProfile,
  ResponseToken,
  appleLogin,
  deleteAccount,
  editCategory,
  editProfile,
  getAccessToken,
  getProfile,
  kakaoLogin,
  logout,
  postLogin,
  postSignup,
} from '@/api/auth';
import {
  removeEncryptStorage,
  removeHeader,
  setEncryptStorage,
  setHeader,
} from '@/utils';
import queryClient from '@/api/queryClient';
import {numbers, queryKeys, storageKeys} from '@/constants';
import type {
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from '@/types/common';
import {Category, Profile} from '@/types';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
}

function useLogin<T>(
  loginAPI: MutationFunction<ResponseToken, T>,
  mutationOptions?: UseMutationCustomOptions,
) {
  return useMutation({
    mutationFn: loginAPI,
    onSuccess: ({accessToken, refreshToken}) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
    },
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
}

function useEmailLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(postLogin, mutationOptions);
}

function useKakaoLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(kakaoLogin, mutationOptions);
}

function useAppleLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(appleLogin, mutationOptions);
}

function useGetRefreshToken() {
  const {data, error, isSuccess, isError} = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    }
  }, [isError]);

  return {isSuccess, isError};
}

type ResponseSelectProfile = {categories: Category} & Profile;

const transformProfileCategory = (
  data: ResponseProfile,
): ResponseSelectProfile => {
  const {BLUE, GREEN, PURPLE, RED, YELLOW, ...rest} = data;
  const categories = {BLUE, GREEN, PURPLE, RED, YELLOW};

  return {categories, ...rest};
};

function useGetProfile(
  queryOptions?: UseQueryCustomOptions<ResponseProfile, ResponseSelectProfile>,
) {
  return useQuery({
    queryFn: getProfile,
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    select: transformProfileCategory,
    ...queryOptions,
  });
}

function useMutateCategory(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: editCategory,
    onSuccess: newProfile => {
      queryClient.setQueryData(
        [queryKeys.AUTH, queryKeys.GET_PROFILE],
        newProfile,
      );
    },
    ...mutationOptions,
  });
}

function useUpdateProfile(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: editProfile,
    onSuccess: newProfile => {
      queryClient.setQueryData(
        [queryKeys.AUTH, queryKeys.GET_PROFILE],
        newProfile,
      );
    },
    ...mutationOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      queryClient.resetQueries({queryKey: [queryKeys.AUTH]});
    },
    ...mutationOptions,
  });
}

function useMutateDeleteAccount(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: deleteAccount,
    ...mutationOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  const isLogin = getProfileQuery.isSuccess;
  const loginMutation = useEmailLogin();
  const kakaoLoginMutation = useKakaoLogin();
  const appleLoginMutation = useAppleLogin();
  const logoutMutation = useLogout();
  const profileMutation = useUpdateProfile();
  const deleteAccountMutation = useMutateDeleteAccount({
    onSuccess: () => logoutMutation.mutate(null),
  });
  const categoryMutation = useMutateCategory();

  return {
    signupMutation,
    loginMutation,
    getProfileQuery,
    isLogin,
    logoutMutation,
    kakaoLoginMutation,
    appleLoginMutation,
    profileMutation,
    deleteAccountMutation,
    categoryMutation,
  };
}

export default useAuth;
