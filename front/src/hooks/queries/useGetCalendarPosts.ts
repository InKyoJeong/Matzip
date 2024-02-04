import {ResponseCalendarPost, getCalendarPosts} from '@/api';
import {queryKeys} from '@/constants';
import {UseQueryCustomOptions} from '@/types';
import {useQuery} from '@tanstack/react-query';

function useGetCalendarPosts(
  year: number,
  month: number,
  queryOptions?: UseQueryCustomOptions<ResponseCalendarPost>,
) {
  return useQuery({
    queryFn: () => getCalendarPosts(year, month),
    queryKey: [queryKeys.POST, queryKeys.GET_CALENDAR_POSTS, year, month],
    ...queryOptions,
  });
}

export default useGetCalendarPosts;
