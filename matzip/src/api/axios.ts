import axios from 'axios';
import {Platform} from 'react-native';

export const baseUrls = {
  android: 'http://192.168.219.163:3030', // 자신의 주소에 맞게 변경해주세요.
  ios: 'http://192.168.219.163:3030', // 자신의 주소에 맞게 변경해주세요.
};

const axiosInstance = axios.create({
  baseURL: Platform.OS === 'android' ? baseUrls.android : baseUrls.ios,
});

export default axiosInstance;
