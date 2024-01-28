import React from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';

import {colors} from '@/constants';

function FeedFavoriteScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>즐겨찾기 스크린</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});
export default FeedFavoriteScreen;
