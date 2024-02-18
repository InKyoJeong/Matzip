import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderButton from '../common/HeaderButton';
import {colors} from '@/constants';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';

type SettingHeaderLeftProps = CompositeNavigationProp<
  StackNavigationProp<SettingStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function SettingHeaderLeft(navigation: SettingHeaderLeftProps) {
  return (
    <HeaderButton
      icon={<Ionicons name="menu" color={colors.BLACK} size={25} />}
      onPress={() => navigation.openDrawer()}
    />
  );
}

export default SettingHeaderLeft;
