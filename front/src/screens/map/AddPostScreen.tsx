import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import Octicons from 'react-native-vector-icons/Octicons';

import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import useGetAddress from '@/hooks/useGetAddress';
import useModal from '@/hooks/useModal';
import useForm from '@/hooks/useForm';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import AddPostHeaderRight from '@/components/AddPostHeaderRight';
import MarkerSelector from '@/components/MarkerSelector';
import ScoreInput from '@/components/ScoreInput';
import DatePickerOption from '@/components/DatePickerOption';
import {getDateWithSeparator, validateAddPost} from '@/utils';
import {colors, mapNavigations} from '@/constants';
import {MarkerColor} from '@/types';
import ImageInput from '@/components/ImageInput';
import usePermission from '@/hooks/usePermission';
import useImagePicker from '@/hooks/useImagePicker';
import PreviewImageList from '@/components/PreviewImageList';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

function AddPostScreen({route, navigation}: AddPostScreenProps) {
  const {location} = route.params;
  const descriptionRef = useRef<TextInput | null>(null);
  const createPost = useMutateCreatePost();
  const address = useGetAddress(location);
  const addPost = useForm({
    initialValue: {
      title: '',
      description: '',
    },
    validate: validateAddPost,
  });
  const datePickerModal = useModal();
  const [date, setDate] = useState(new Date());
  const [isPicked, setIsPicked] = useState(false);
  const [markerColor, setMarkerColor] = useState<MarkerColor>('RED');
  const [score, setScore] = useState(5);
  const imagePicker = useImagePicker({
    initialImages: [],
  });
  usePermission('PHOTO');

  const handleChangeDate = (pickedDate: Date) => {
    setDate(pickedDate);
  };

  const handleConfirmDate = () => {
    setIsPicked(true);
    datePickerModal.hide();
  };

  const handleSelectMarker = (name: MarkerColor) => {
    setMarkerColor(name);
  };

  const handleChangeScore = (value: number) => {
    setScore(value);
  };

  const handleSubmit = () => {
    const body = {
      date,
      title: addPost.values.title,
      description: addPost.values.description,
      color: markerColor,
      score,
      imageUris: imagePicker.imageUris,
    };

    createPost.mutate(
      {address, ...location, ...body},
      {
        onSuccess: () => navigation.goBack(),
      },
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => AddPostHeaderRight(handleSubmit),
    });
  }, [handleSubmit, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            value={address}
            disabled={true}
            icon={
              <Octicons name="location" size={16} color={colors.GRAY_500} />
            }
          />
          <CustomButton
            variant="outlined"
            size="large"
            label={
              isPicked ? `${getDateWithSeparator(date, '. ')}` : '날짜 선택'
            }
            onPress={datePickerModal.show}
          />
          <InputField
            {...addPost.getTextInputProps('title')}
            error={addPost.errors.title}
            touched={addPost.touched.title}
            placeholder="제목을 입력하세요."
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              descriptionRef.current?.focus();
            }}
          />
          <InputField
            {...addPost.getTextInputProps('description')}
            error={addPost.errors.description}
            touched={addPost.touched.description}
            ref={descriptionRef}
            placeholder="기록하고 싶은 내용을 입력하세요. (선택)"
            returnKeyType="next"
            multiline
          />
          <MarkerSelector
            score={score}
            markerColor={markerColor}
            onPressMarker={handleSelectMarker}
          />
          <ScoreInput score={score} onChangeScore={handleChangeScore} />
          <View style={styles.imagesViewer}>
            <ImageInput onChange={imagePicker.handleChange} />
            <PreviewImageList
              imageUris={imagePicker.imageUris}
              onDelete={imagePicker.delete}
              onChangeOrder={imagePicker.changeOrder}
            />
          </View>
          <DatePickerOption
            date={date}
            isVisible={datePickerModal.isVisible}
            onChangeDate={handleChangeDate}
            onConfirmDate={handleConfirmDate}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
  imagesViewer: {
    flexDirection: 'row',
  },
});

export default AddPostScreen;
