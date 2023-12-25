import {useMutation} from '@tanstack/react-query';

import {createPost} from '@/api/post';
import {Marker, UseMutationCustomOptions} from '@/types';
import queryClient from '@/api/queryClient';
import {queryKeys} from '@/constants';

function useMutateCreatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createPost,
    onSuccess: newPost => {
      // queryClient.invalidateQueries({
      //   queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      // });

      queryClient.setQueryData<Marker[]>(
        [queryKeys.MARKER, queryKeys.GET_MARKERS],
        existingMarkers => {
          const newMarker = {
            id: newPost.id,
            latitude: newPost.latitude,
            longitude: newPost.longitude,
            color: newPost.color,
            score: newPost.score,
          };

          return existingMarkers
            ? [...existingMarkers, newMarker]
            : [newMarker];
        },
      );
    },

    ...mutationOptions,
  });
}

export default useMutateCreatePost;
