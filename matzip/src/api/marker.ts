import {Marker} from '@/types/domain';
import axiosInstance from './axios';

async function getMarkers(): Promise<Marker[]> {
  const {data} = await axiosInstance.get('/markers');

  return data;
}

export {getMarkers};
