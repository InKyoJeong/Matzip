import {
  InfiniteData,
  QueryKey,
  useSuspenseInfiniteQuery,
  UseSuspenseInfiniteQueryOptions,
} from '@tanstack/react-query';

import {getFavoritePosts} from '@/api/post';
import {queryKeys} from '@/constants/keys';
import {ResponseError} from '@/types/api';
import {Post} from '@/types/domain';

function useGetInfiniteFavoritePosts(
  queryOptions?: UseSuspenseInfiniteQueryOptions<
    Post[],
    ResponseError,
    InfiniteData<Post[], number>,
    QueryKey,
    number
  >,
) {
  return useSuspenseInfiniteQuery({
    queryFn: ({pageParam}) => getFavoritePosts(pageParam),
    queryKey: [
      queryKeys.POST,
      queryKeys.GET_POSTS,
      queryKeys.GET_FAVORITE_POSTS,
    ],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
    ...queryOptions,
  });
}

export default useGetInfiniteFavoritePosts;
