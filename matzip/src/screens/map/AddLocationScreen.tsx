import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker';
import ImagePicker from 'react-native-image-crop-picker';

import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import MarkerColorInput from '@/components/MarkerColorInput';
import ScoreInput from '@/components/ScoreInput';
import FixedBottomCTA from '@/components/FixedBottomCTA';
import useForm from '@/hooks/useForm';
import useGetAddress from '@/hooks/useGetAddress';
import {colors} from '@/constants/colors';
import {validateAddPost} from '@/utils/validation';
import {getDateWithSeparator} from '@/utils/date';
import {MapStackParamList} from '@/types/navigation';
import ImageInput from '@/components/ImageInput';
import usePermission from '@/hooks/usePermission';

type Props = StackScreenProps<MapStackParamList, 'AddLocation'>;

function AddLocationScreen({route}: Props) {
  const {location} = route.params;
  const inset = useSafeAreaInsets();
  const address = useGetAddress(location);
  const postForm = useForm({
    initialValue: {
      title: '',
      description: '',
      date: new Date(),
      color: colors.PINK_400,
      score: 3,
    },
    validate: validateAddPost,
  });
  const [openDate, setOpenDate] = useState(false);
  usePermission('PHOTO');

  const handleSubmit = () => {
    console.log('postForm.values', postForm.values);
  };

  const handleChangeImage = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: 5,
    }).then(images => console.log('images', images));
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {paddingBottom: inset.bottom + 100},
        ]}>
        <InputField disabled value={address} />
        <CustomButton
          variant="outlined"
          label={getDateWithSeparator(postForm.values.date, '. ')}
          onPress={() => setOpenDate(true)}
        />
        <InputField
          placeholder="제목을 입력하세요."
          error={postForm.errors.title}
          touched={postForm.touched.title}
          {...postForm.getTextInputProps('title')}
        />
        <InputField
          multiline
          placeholder="기록하고 싶은 내용을 입력하세요. (선택)"
          error={postForm.errors.description}
          touched={postForm.touched.description}
          {...postForm.getTextInputProps('description')}
        />
        <MarkerColorInput
          color={postForm.values.color}
          score={postForm.values.score}
          onChangeColor={value => postForm.onChange('color', value)}
        />
        <ScoreInput
          score={postForm.values.score}
          onChangeScore={value => postForm.onChange('score', value)}
        />
        <DatePicker
          modal
          locale="ko"
          mode="date"
          title={null}
          cancelText="취소"
          confirmText="완료"
          date={postForm.values.date}
          open={openDate}
          onConfirm={date => {
            postForm.onChange('date', date);
            setOpenDate(false);
          }}
          onCancel={() => setOpenDate(false)}
        />
        <ImageInput onChange={handleChangeImage} />
      </ScrollView>
      <FixedBottomCTA label="저장" onPress={handleSubmit} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
  },
});

export default AddLocationScreen;
