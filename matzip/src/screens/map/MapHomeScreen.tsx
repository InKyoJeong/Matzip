import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

import DrawerButton from '@/components/DrawerButton';

function MapHomeScreen() {
  return (
    <SafeAreaView>
      <Text>MapHomeScreen</Text>
      <DrawerButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default MapHomeScreen;
