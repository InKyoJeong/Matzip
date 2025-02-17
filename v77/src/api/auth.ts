import {Category, Profile} from '../types/domain';
import {getEncryptStorage} from '../utils/encryptStorage';
import axiosInstance from './axios';

type RequestUser = {
  email: string;
  password: string;
};

async function postSignup({email, password}: RequestUser): Promise<void> {
  const {data} = await axiosInstance.post('/auth/signup', {email, password});

  return data;
}

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

async function postLogin({
  email,
  password,
}: RequestUser): Promise<ResponseToken> {
  const {data} = await axiosInstance.post('/auth/signin', {email, password});

  return data;
}

type ResponseProfile = Profile & Category;

async function getProfile(): Promise<ResponseProfile> {
  const {data} = await axiosInstance.get('/auth/me');

  return data;
}

async function getAccessToken(): Promise<ResponseToken> {
  const refreshToken = await getEncryptStorage('refreshToken');

  const {data} = await axiosInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
}

async function logout() {
  await axiosInstance.post('/auth/logout');
}

export {postSignup, postLogin, getProfile, getAccessToken, logout};
