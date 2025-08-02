import {useMutation} from '@tanstack/react-query';

import {createPost} from '@/api/post';
import {UseMutationCustomOptions} from '@/types/api';
import queryClient from '@/api/queryClient';
import {queryKeys} from '@/constants/keys';

function useMutateCreatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
    },
    ...mutationOptions,
  });
}

export default useMutateCreatePost;
