import InputField from '@/components/common/InputField';
import EditProfileHeaderRight from '@/components/setting/EditProfileHeaderRight';
import EditProfileImageOption from '@/components/setting/EditProfileImageOption';
import {colors, errorMessages, settingNavigations} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import useImagePicker from '@/hooks/useImagePicker';
import useModal from '@/hooks/useModal';
import {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import {validateEditProfile} from '@/utils';
import {StackScreenProps} from '@react-navigation/stack';
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
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';

type EditProfileScreenProps = StackScreenProps<SettingStackParamList>;

function EditProfileScreen({navigation}: EditProfileScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
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
    profileMutation.mutate(
      {
        ...editProfile.values,
        imageUri: imagePicker.imageUris[0]?.uri,
      },
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
          }),
      },
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => EditProfileHeaderRight(handleSubmit),
    });
  }, [handleSubmit]);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Pressable
          style={[styles.imageContainer, styles.emptyImageContainer]}
          onPress={handlePressImage}>
          {imagePicker.imageUris.length === 0 && !kakaoImageUri && (
            <Ionicons
              name="camera-outline"
              size={30}
              color={colors[theme].GRAY_500}
            />
          )}
          {imagePicker.imageUris.length === 0 && kakaoImageUri && (
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
      <Pressable
        style={styles.deleteAccountContainer}
        onPress={() => navigation.navigate(settingNavigations.DELETE_ACCOUNT)}>
        <Ionicons
          name="remove-circle-sharp"
          size={18}
          color={colors[theme].RED_500}
        />
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

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
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
      borderColor: colors[theme].GRAY_200,
      borderRadius: 50,
      borderWidth: 1,
    },
    deleteAccountContainer: {
      position: 'absolute',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      right: 20,
      bottom: 70,
      backgroundColor: colors[theme].GRAY_100,
      borderRadius: 10,
      padding: 10,
    },
    deleteAccountText: {
      color: colors[theme].RED_500,
      fontSize: 15,
    },
  });

export default EditProfileScreen;
