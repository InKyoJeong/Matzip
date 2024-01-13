import React from 'react';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {DrawerNavigationProp} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import type {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import type {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {colors} from '@/constants';
import HeaderButton from './HeaderButton';

type FeedHomeHeaderLeftProps = CompositeNavigationProp<
  StackNavigationProp<FeedStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function FeedHomeHeaderLeft(navigation: FeedHomeHeaderLeftProps) {
  return (
    <HeaderButton
      icon={<Ionicons name="menu" color={colors.BLACK} size={25} />}
      onPress={() => navigation.openDrawer()}
    />
  );
}

export default FeedHomeHeaderLeft;
