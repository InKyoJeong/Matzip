import React from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

import SettingItem from '@/components/setting/SettingItem';
import {colors, settingNavigations} from '@/constants';
import {StackScreenProps} from '@react-navigation/stack';
import {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import useAuth from '@/hooks/queries/useAuth';
import DarkModeOption from '@/components/setting/DarkModeOption';
import useModal from '@/hooks/useModal';
import useThemeStore from '@/store/useThemeStore';

type SettingHomeScreenProps = StackScreenProps<SettingStackParamList>;

function SettingHomeScreen({navigation}: SettingHomeScreenProps) {
  const {theme} = useThemeStore();
  const {logoutMutation} = useAuth();
  const darkModeOption = useModal();

  const handlePressEditProfile = () => {
    navigation.navigate(settingNavigations.EDIT_PROFILE);
  };

  const handlePressEditCategory = () => {
    navigation.navigate(settingNavigations.EDIT_CATEGORY);
  };

  const handlePressLogout = () => {
    logoutMutation.mutate(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.space} />
        <SettingItem title="프로필 수정" onPress={handlePressEditProfile} />
        <SettingItem
          title="마커 카테고리 설정"
          onPress={handlePressEditCategory}
        />
        <SettingItem title="다크 모드" onPress={darkModeOption.show} />

        <View style={styles.space} />
        <SettingItem
          title="로그아웃"
          onPress={handlePressLogout}
          color={colors[theme].RED_500}
          icon={
            <Octicons
              name={'sign-out'}
              color={colors[theme].RED_500}
              size={16}
            />
          }
        />

        <DarkModeOption
          isVisible={darkModeOption.isVisible}
          hideOption={darkModeOption.hide}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  space: {
    height: 30,
  },
});

export default SettingHomeScreen;
