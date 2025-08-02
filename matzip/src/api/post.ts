import {Post} from '@/types/domain';
import axiosInstance from './axios';

async function createPost(body: Omit<Post, 'id'>): Promise<Post> {
  const {data} = await axiosInstance.post('/posts', body);

  return data;
}

export {createPost};
