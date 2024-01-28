import {useMutation} from '@tanstack/react-query';

import queryClient from '@/api/queryClient';
import {ResponseSinglePost, updateFavoritePost} from '@/api';
import {queryKeys} from '@/constants';
import type {UseMutationCustomOptions} from '@/types';

function useMutateFavoritePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: updateFavoritePost,
    onSuccess: updatedId => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, updatedId],
      });

      //   const existingPost = queryClient.getQueryData<ResponseSinglePost>([
      //     queryKeys.POST,
      //     queryKeys.GET_POST,
      //     updatedId,
      //   ]) as ResponseSinglePost;

      //   queryClient.setQueryData<ResponseSinglePost>(
      //     [queryKeys.POST, queryKeys.GET_POST, updatedId],
      //     {...existingPost, isFavorite: !existingPost.isFavorite},
      //   );
    },
    ...mutationOptions,
  });
}

export default useMutateFavoritePost;
