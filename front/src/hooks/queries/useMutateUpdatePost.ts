import {updatePost} from '@/api';
import queryClient from '@/api/queryClient';
import {queryKeys} from '@/constants';
import {UseMutationCustomOptions} from '@/types';
import {useMutation} from '@tanstack/react-query';

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
      queryClient.setQueryData(
        [queryKeys.POST, queryKeys.GET_POST, newPost.id],
        newPost,
      );
    },
    ...mutationOptions,
  });
}

export default useMutateUpdatePost;
