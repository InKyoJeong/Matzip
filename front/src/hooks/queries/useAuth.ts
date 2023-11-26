import {useEffect} from 'react';
import {UseQueryOptions, useMutation, useQuery} from '@tanstack/react-query';
import {
  ResponseProfile,
  getAccessToken,
  getProfile,
  postLogin,
  postSignup,
} from '../../api/auth';
import type {
  ResponseError,
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from '../../types/common';
import queryClient from '../../api/queryClient';
import {
  removeHeader,
  setHeader,
  removeEncryptStorage,
  setEncryptStorage,
} from '../../utils';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    // onError: error => console.log('error', error.response?.data.message),
    ...mutationOptions,
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({accessToken, refreshToken}) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      setEncryptStorage('refreshToken', refreshToken);
    },
    onSettled: () => {
      queryClient.refetchQueries({queryKey: ['auth', 'getAccessToken']});
      queryClient.invalidateQueries({queryKey: ['auth', 'getProfile']});
    },
    ...mutationOptions,
  });
}

function useGetRefreshToken() {
  const {data, error, isSuccess, isError} = useQuery({
    queryKey: ['auth', 'getAccessToken'],
    queryFn: getAccessToken,
    staleTime: 1000 * 60 * 30 - 1000 * 60 * 3,
    refetchInterval: 1000 * 60 * 30 - 1000 * 60 * 3,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    setHeader('Authorization', `Bearer ${data?.accessToken}`);
    setEncryptStorage('refreshToken', data?.refreshToken);
  }, [isSuccess]);

  useEffect(() => {
    removeHeader('Authorization');
    removeEncryptStorage('refreshToken');
  }, [isError]);

  return {isSuccess, isError};
}

function useGetProfile(queryOptions?: UseQueryCustomOptions<ResponseProfile>) {
  return useQuery({
    queryFn: getProfile,
    queryKey: ['auth', 'getProfile'],
    ...queryOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  const isLogin = getProfileQuery.isSuccess;
  const loginMutation = useLogin();

  return {
    signupMutation,
    loginMutation,
    getProfileQuery,
    isLogin,
  };
}

export default useAuth;
