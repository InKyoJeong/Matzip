import React from 'react';
import {Image, Platform, Pressable, StyleSheet, View} from 'react-native';
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

function EditProfileScreen() {
  const {auth} = useAuth();
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
                color={colors.GRAY_500}
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
      <FixedBottomCTA label="저장" onPress={() => {}} />

      <EditProfileActionSheet
        isVisible={imageAction.isVisible}
        hideAction={imageAction.hide}
        onChangeImage={imagePicker.handleChangeImage}
      />
    </>
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
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
});

export default EditProfileScreen;
