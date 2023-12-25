import {useMutation} from '@tanstack/react-query';

import {createPost} from '@/api/post';
import {UseMutationCustomOptions} from '@/types';

function useMutateCreatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createPost,
    ...mutationOptions,
  });
}

export default useMutateCreatePost;
