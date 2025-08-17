import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SettingItem from '@/components/setting/SettingItem';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {colors} from '@/constants/colors';
import useAuth from '@/hooks/queries/useAuth';
import {SettingStackParamList} from '@/types/navigation';
import useModal from '@/hooks/useModal';
import DarkModeActionSheet from '@/components/setting/DarkModeActionSheet';
import useThemeStore from '@/store/theme';

type Navigation = NavigationProp<SettingStackParamList>;

function SettingHomeScreen() {
  const {theme} = useThemeStore();
  const navigation = useNavigation<Navigation>();
  const {logoutMutation} = useAuth();
  const darkModeAction = useModal();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.space} />
        <SettingItem
          title="프로필 수정"
          onPress={() => navigation.navigate('EditProfile')}
        />
        <SettingItem title="다크 모드" onPress={darkModeAction.show} />
        <View style={styles.space} />
        <SettingItem
          title="로그아웃"
          color={colors[theme].RED_500}
          onPress={() => logoutMutation.mutate(null)}
        />

        <DarkModeActionSheet
          isVisible={darkModeAction.isVisible}
          hideAction={darkModeAction.hide}
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
