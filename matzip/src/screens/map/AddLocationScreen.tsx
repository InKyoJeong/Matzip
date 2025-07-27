import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {MapStackParamList} from '@/types/navigation';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import useForm from '@/hooks/useForm';
import {validateAddPost} from '@/utils/validation';
import useGetAddress from '@/hooks/useGetAddress';
import DatePicker from 'react-native-date-picker';
import {getDateWithSeparator} from '@/utils/date';

type Props = StackScreenProps<MapStackParamList, 'AddLocation'>;

function AddLocationScreen({route}: Props) {
  const {location} = route.params;
  const address = useGetAddress(location);
  const postForm = useForm({
    initialValue: {
      title: '',
      description: '',
      date: new Date(),
    },
    validate: validateAddPost,
  });
  const [openDate, setOpenDate] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
  },
});

export default AddLocationScreen;
