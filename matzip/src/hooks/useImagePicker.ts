import {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';

import useMutateImages from '@/hooks/queries/useMutateImages';
import {getFormDataImages} from '@/utils/image';
import {ImageUri} from '@/types/domain';

function useImagePicker() {
  const uploadImages = useMutateImages();
  const [imageUris, setImageUris] = useState<ImageUri[]>([]);

  const addImageUris = (uris: string[]) => {
    setImageUris(prev => [...prev, ...uris.map(uri => ({uri}))]);
  };

  const handleChangeImage = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: 5,
    }).then(images => {
      const formData = getFormDataImages('images', images);
      uploadImages.mutate(formData, {
        onSuccess: data => addImageUris(data),
      });
    });
  };

  return {imageUris, handleChangeImage};
}

export default useImagePicker;
