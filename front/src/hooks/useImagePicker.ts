import {useState} from 'react';
import {Alert} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';

import useMutateImages from './queries/useMutateImages';
import type {ImageUri} from '@/types';
import {getFormDataImages} from '@/utils';

interface UseImagePickerProps {
  initialImages: ImageUri[];
  mode?: 'multiple' | 'single';
  onSettled?: () => void;
}

function useImagePicker({
  initialImages = [],
  mode = 'multiple',
  onSettled,
}: UseImagePickerProps) {
  const [imageUris, setImageUris] = useState(initialImages);
  const uploadImages = useMutateImages();

  const addImageUris = (uris: string[]) => {
    if (imageUris.length + uris.length > 5) {
      Alert.alert('이미지 개수 초과', '추가 가능한 이미지는 최대 5개입니다.');
      return;
    }

    setImageUris(prev => [...prev, ...uris.map(uri => ({uri}))]);
  };

  const replaceImageUri = (uris: string[]) => {
    if (uris.length > 1) {
      Alert.alert('이미지 개수 초과', '추가 가능한 이미지는 최대 1개입니다.');
      return;
    }

    setImageUris([...uris.map(uri => ({uri}))]);
  };

  const deleteImageUri = (uri: string) => {
    const newImageUris = imageUris.filter(image => image.uri !== uri);
    setImageUris(newImageUris);
  };

  const changeImageUrisOrder = (fromIndex: number, toIndex: number) => {
    const copyImageUris = [...imageUris];
    const [removedImage] = copyImageUris.splice(fromIndex, 1);
    copyImageUris.splice(toIndex, 0, removedImage);
    setImageUris(copyImageUris);
  };

  const handleChange = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: mode === 'multiple' ? 5 : 1,
      cropperChooseText: '완료',
      cropperCancelText: '취소',
    })
      .then(images => {
        const formData = getFormDataImages('images', images);

        uploadImages.mutate(formData, {
          onSuccess: data =>
            mode === 'multiple' ? addImageUris(data) : replaceImageUri(data),
          onSettled: () => onSettled && onSettled(),
        });
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          Toast.show({
            type: 'error',
            text1: '갤러리를 열 수 없어요.',
            text2: '권한을 허용했는지 확인해주세요.',
            position: 'bottom',
            // visibilityTime: 3000,
          });
        }
      });
  };

  return {
    imageUris,
    handleChange,
    delete: deleteImageUri,
    changeOrder: changeImageUrisOrder,
    isUploading: uploadImages.isPending,
  };
}

export default useImagePicker;
