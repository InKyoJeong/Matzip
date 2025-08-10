import {useQuery} from '@tanstack/react-query';

import {getPost} from '@/api/post';
import {queryKeys} from '@/constants/keys';
import {UseQueryCustomOptions} from '@/types/api';
import {Post} from '@/types/domain';

function useGetPost(id?: number, queryOptions?: UseQueryCustomOptions<Post>) {
  return useQuery({
    queryFn: () => getPost(Number(id)),
    queryKey: [queryKeys.POST, queryKeys.GET_POST, id],
    enabled: Boolean(id),
    ...queryOptions,
  });
}

export default useGetPost;
