import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {MainDrawerParamList} from '../types/navigation';

type Navigation = DrawerNavigationProp<MainDrawerParamList>;

function DrawerButton() {
  const navigation = useNavigation<Navigation>();

  return (
    <Pressable onPress={() => navigation.openDrawer()}>
      <Text style={{fontSize: 20}}>서랍</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({});

export default DrawerButton;
