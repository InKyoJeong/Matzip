import {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';

import useMutateImages from '@/hooks/queries/useMutateImages';
import {getFormDataImages} from '@/utils/image';
import {ImageUri} from '@/types/domain';

function useImagePicker() {
  const uploadImages = useMutateImages();
  const [imageUris, setImageUris] = useState<ImageUri[]>([]);

  const addImageUris = (uris: string[]) => {
    setImageUris(prev => [...prev, ...uris.map(uri => ({uri}))]);
  };

  const deleteImageUri = (uri: string) => {
    const newImageUris = imageUris.filter(image => image.uri !== uri);
    setImageUris(newImageUris);
  };

  const handleChangeImage = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: 5,
    })
      .then(images => {
        const formData = getFormDataImages('images', images);
        uploadImages.mutate(formData, {
          onSuccess: data => addImageUris(data),
        });
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          Toast.show({
            type: 'error',
            text1: '권한을 허용했는지 확인해주세요.',
            position: 'bottom',
          });
        }
      });
  };

  return {imageUris, handleChangeImage, delete: deleteImageUri};
}

export default useImagePicker;
