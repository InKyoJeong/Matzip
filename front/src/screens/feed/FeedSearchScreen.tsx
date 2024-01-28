import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {colors} from '@/constants';
import FeedSearchList from '@/components/feed/FeedSearchList';

function FeedSearchScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FeedSearchList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default FeedSearchScreen;
