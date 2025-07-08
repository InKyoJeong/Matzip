import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

function DrawerButton() {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.openDrawer()}>
      <Text style={{fontSize: 20}}>서랍</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({});

export default DrawerButton;
