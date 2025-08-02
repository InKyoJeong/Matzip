import {uploadImages} from '@/api/image';
import {UseMutationCustomOptions} from '@/types/api';
import {useMutation} from '@tanstack/react-query';

function useMutateImages(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: uploadImages,
    ...mutationOptions,
  });
}

export default useMutateImages;
