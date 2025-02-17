import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getAccessToken,
  getProfile,
  logout,
  postLogin,
  postSignup,
} from '../../api/auth';
import {useEffect} from 'react';
import {
  removeEncryptStorage,
  setEncryptStorage,
} from '../../utils/encryptStorage';
import queryClient from '../../api/queryClient';
import {numbers} from '../../constants';
import {removeHeader, setHeader} from '../../utils/header';
import {
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from '../../types/common';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({accessToken, refreshToken}) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      await setEncryptStorage('refreshToken', refreshToken);
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: ['auth', 'accessToken'],
      });
      queryClient.invalidateQueries({
        queryKey: ['auth', 'getProfile'],
      });
    },
    ...mutationOptions,
  });
}

function useGetRefreshToken() {
  const {data, isSuccess, isError, isPending} = useQuery({
    queryKey: ['auth', 'accessToken'],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    (async () => {
      if (isSuccess) {
        setHeader('Authorization', `Bearer ${data.accessToken}`);
        await setEncryptStorage('refreshToken', data.refreshToken);
      }
    })();
  }, [isSuccess]);

  useEffect(() => {
    (async () => {
      if (isError) {
        removeHeader('Authorization');
        await removeEncryptStorage('refreshToken');
      }
    })();
  }, [isError]);

  return {isSuccess, isError, isPending};
}

function useGetProfile(queryOptions?: UseQueryCustomOptions) {
  return useQuery({
    queryFn: getProfile,
    queryKey: ['auth', 'getProfile'],
    ...queryOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      removeHeader('Authorization');
      await removeEncryptStorage('refreshToken');
      queryClient.resetQueries({queryKey: ['auth']});
    },
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
  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const isLoginLoading = refreshTokenQuery.isPending;

  return {
    signupMutation,
    loginMutation,
    getProfileQuery,
    isLogin,
    logoutMutation,
    isLoginLoading,
  };
}

export default useAuth;
