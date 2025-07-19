import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

import DrawerButton from '@/components/DrawerButton';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

function MapHomeScreen() {
  return <MapView style={styles.container} provider={PROVIDER_GOOGLE} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapHomeScreen;
