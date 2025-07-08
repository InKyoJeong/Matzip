import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text} from 'react-native';
import DrawerButton from '../../components/DrawerButton';

function MapHomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Text>MapHomeScreen</Text>
      <DrawerButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default MapHomeScreen;
