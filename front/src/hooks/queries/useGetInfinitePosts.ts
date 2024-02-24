import {ResponsePost, getPosts} from '@/api';
import {queryKeys} from '@/constants';
import {ResponseError} from '@/types';
import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

function useGetInfinitePosts(
  queryOptions?: UseInfiniteQueryOptions<
    ResponsePost[],
    ResponseError,
    InfiniteData<ResponsePost[], number>,
    ResponsePost[],
    QueryKey,
    number
  >,
) {
  return useSuspenseInfiniteQuery({
    queryFn: ({pageParam}) => getPosts(pageParam),
    queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
    ...queryOptions,
  });
}

export default useGetInfinitePosts;
