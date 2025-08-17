import React from 'react';
import {
  Image,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

import {validateEditProfile} from '@/utils/validation';
import FixedBottomCTA from '@/components/common/FixedBottomCTA';
import InputField from '@/components/common/InputField';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import useImagePicker from '@/hooks/useImagePicker';
import {colors} from '@/constants/colors';
import {baseUrls} from '@/api/axios';
import useModal from '@/hooks/useModal';
import EditProfileActionSheet from '@/components/setting/EditProfileActionSheet';
import Toast from 'react-native-toast-message';
import useThemeStore, {Theme} from '@/store/theme';

function EditProfileScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {auth, profileMutation} = useAuth();
  const imageAction = useModal();
  const imagePicker = useImagePicker({
    initialImages: auth.imageUri ? [{uri: auth.imageUri}] : [],
    mode: 'single',
    onSettled: imageAction.hide,
  });
  const editProfile = useForm({
    initialValue: {nickname: auth.nickname ?? ''},
    validate: validateEditProfile,
  });

  const handlePressImage = () => {
    imageAction.show();
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
      },
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Pressable
            style={[styles.imageContainer, styles.emptyImageContainer]}
            onPress={handlePressImage}>
            {imagePicker.imageUris.length === 0 ? (
              <Ionicons
                name="camera-outline"
                size={30}
                color={colors[theme].GRAY_500}
              />
            ) : (
              <Image
                source={{
                  uri: `${
                    Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android
                  }/${imagePicker.imageUris[0]?.uri}`,
                }}
                style={styles.image}
                resizeMode="cover"
              />
            )}
          </Pressable>
        </View>

        <InputField
          {...editProfile.getTextInputProps('nickname')}
          error={editProfile.errors.nickname}
          touched={editProfile.touched.nickname}
          placeholder="닉네임을 입력해주세요."
        />
      </View>
      <FixedBottomCTA label="저장" onPress={handleSubmit} />

      <EditProfileActionSheet
        isVisible={imageAction.isVisible}
        hideAction={imageAction.hide}
        onChangeImage={imagePicker.handleChangeImage}
      />
    </>
  );
}

const styling = (theme: Theme) =>
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
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 50,
    },
  });

export default EditProfileScreen;
