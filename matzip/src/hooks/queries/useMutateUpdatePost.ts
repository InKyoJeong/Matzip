import {useMutation} from '@tanstack/react-query';

import {updatePost} from '@/api/post';
import queryClient from '@/api/queryClient';
import {queryKeys} from '@/constants/keys';
import {UseMutationCustomOptions} from '@/types/api';

function useMutateUpdatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: updatePost,
    onSuccess: newPost => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
      //   queryClient.invalidateQueries({
      //     queryKey: [queryKeys.POST, queryKeys.GET_POST, newPost.id],
      //   });
      queryClient.setQueryData(
        [queryKeys.POST, queryKeys.GET_POST, newPost.id],
        newPost,
      );
    },
    ...mutationOptions,
  });
}

export default useMutateUpdatePost;
