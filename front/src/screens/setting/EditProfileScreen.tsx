import React, {useEffect} from 'react';
import {
  Image,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

import InputField from '@/components/common/InputField';
import {colors, errorMessages} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import useImagePicker from '@/hooks/useImagePicker';
import {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import {validateEditProfile} from '@/utils';
import {ActivityIndicator} from 'react-native';
import EditProfileHeaderRight from '@/components/setting/EditProfileHeaderRight';
import EditProfileImageOption from '../../components/setting/EditProfileImageOption';
import useModal from '@/hooks/useModal';

type EditProfileScreenProps = StackScreenProps<SettingStackParamList>;

function EditProfileScreen({navigation}: EditProfileScreenProps) {
  const {getProfileQuery, profileMutation} = useAuth();
  const {nickname, imageUri, kakaoImageUri} = getProfileQuery.data || {};
  const imageOption = useModal();

  const imagePicker = useImagePicker({
    initialImages: imageUri ? [{uri: imageUri}] : [],
    mode: 'single',
    onSettled: imageOption.hide,
  });
  const editProfile = useForm({
    initialValue: {nickname: nickname ?? ''},
    validate: validateEditProfile,
  });

  const handlePressImage = () => {
    imageOption.show();
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    if (editProfile.errors.nickname) {
      return;
    }

    profileMutation.mutate(
      {...editProfile.values, imageUri: imagePicker.imageUris[0]?.uri},
      {
        onSuccess: () =>
          Toast.show({
            type: 'success',
            text1: '프로필이 변경되었습니다.',
            position: 'bottom',
          }),
        onError: error =>
          Toast.show({
            type: 'error',
            text1: error.response?.data.message || errorMessages.UNEXPECT_ERROR,
            position: 'bottom',
            visibilityTime: 2000,
          }),
      },
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => EditProfileHeaderRight(handleSubmit),
    });
  }, [handleSubmit, navigation]);

  if (imagePicker.isUploading) {
    return <ActivityIndicator size={'large'} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Pressable
          style={[styles.imageContainer, styles.emptyImageContainer]}
          onPress={handlePressImage}>
          {imagePicker.imageUris.length === 0 && !kakaoImageUri && (
            <Ionicons name="camera-outline" size={30} color={colors.GRAY_500} />
          )}
          {imagePicker.imageUris.length === 0 && !!kakaoImageUri && (
            <>
              <Image
                source={{
                  uri: `${
                    Platform.OS === 'ios'
                      ? 'http://localhost:3030/'
                      : 'http://10.0.2.2:3030/'
                  }${kakaoImageUri}`,
                }}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.cameraButton}>
                <Ionicons name="camera" size={18} color={colors.WHITE} />
              </View>
            </>
          )}
          {imagePicker.imageUris.length > 0 && (
            <>
              <Image
                source={{
                  uri: `${
                    Platform.OS === 'ios'
                      ? 'http://localhost:3030/'
                      : 'http://10.0.2.2:3030/'
                  }${imagePicker.imageUris[0]?.uri}`,
                }}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.cameraButton}>
                <Ionicons name="camera" size={18} color={colors.WHITE} />
              </View>
            </>
          )}
        </Pressable>
      </View>

      <InputField
        {...editProfile.getTextInputProps('nickname')}
        error={editProfile.errors.nickname}
        touched={editProfile.touched.nickname}
        placeholder="닉네임을 입력해주세요."
      />

      <Pressable style={styles.deleteAccountContainer}>
        <Ionicons name="remove-circle-sharp" size={18} color={colors.RED_500} />
        <Text style={styles.deleteAccountText}>회원탈퇴</Text>
      </Pressable>

      <EditProfileImageOption
        isVisible={imageOption.isVisible}
        hideOption={imageOption.hide}
        onChangeImage={imagePicker.handleChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  emptyImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.GRAY_200,
    borderRadius: 50,
    borderWidth: 1,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    backgroundColor: colors.PINK_700,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  deleteAccountContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    right: 20,
    bottom: 70,
    backgroundColor: colors.GRAY_100,
    borderRadius: 10,
    padding: 10,
  },
  deleteAccountText: {
    color: colors.RED_500,
    fontSize: 15,
  },
});

export default EditProfileScreen;
