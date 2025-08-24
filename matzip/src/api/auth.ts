import {Profile} from '@/types/domain';
import {getEncryptStorage} from '@/utils/encryptStorage';
import axiosInstance from './axios';

type RequsetUser = {
  email: string;
  password: string;
};

async function postSignup({email, password}: RequsetUser): Promise<void> {
  await axiosInstance.post('/auth/signup', {email, password});
}

export type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

async function postLogin({
  email,
  password,
}: RequsetUser): Promise<ResponseToken> {
  const {data} = await axiosInstance.post('/auth/signin', {
    email,
    password,
  });

  return data;
}

async function kakaoLogin(token: string): Promise<ResponseToken> {
  const {data} = await axiosInstance.post('/auth/oauth/kakao', {token});

  return data;
}

type RequestAppleIdentity = {
  identityToken: string;
  appId: string;
  nickname: string | null;
};

async function appleLogin(body: RequestAppleIdentity): Promise<ResponseToken> {
  const {data} = await axiosInstance.post('/auth/oauth/apple', body);

  return data;
}

async function getProfile(): Promise<Profile> {
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

type RequestProfile = Pick<Profile, 'nickname' | 'imageUri'>;

async function editProfile(body: RequestProfile): Promise<Profile> {
  const {data} = await axiosInstance.patch('/auth/me', body);

  return data;
}

export {
  postSignup,
  postLogin,
  getProfile,
  getAccessToken,
  logout,
  editProfile,
  kakaoLogin,
  appleLogin,
};
