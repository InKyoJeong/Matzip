import React from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';

import {colors} from '@/constants';
import FeedFavoriteList from '@/components/feed/FeedFavoriteList';

function FeedFavoriteScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FeedFavoriteList />
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
