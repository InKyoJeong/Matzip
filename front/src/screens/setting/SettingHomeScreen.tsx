import React from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

import SettingItem from '@/components/setting/SettingItem';
import {colors, settingNavigations} from '@/constants';
import {StackScreenProps} from '@react-navigation/stack';
import {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import useAuth from '@/hooks/queries/useAuth';

type SettingHomeScreenProps = StackScreenProps<SettingStackParamList>;

function SettingHomeScreen({navigation}: SettingHomeScreenProps) {
  const {logoutMutation} = useAuth();

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
        <View style={styles.space} />
        <SettingItem
          title="로그아웃"
          onPress={handlePressLogout}
          color={colors.RED_500}
          icon={<Octicons name={'sign-out'} color={colors.RED_500} size={16} />}
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
