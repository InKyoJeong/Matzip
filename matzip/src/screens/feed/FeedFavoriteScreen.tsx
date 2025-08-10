import FeedFavoriteList from '@/components/feed/FeedFavoriteList';
import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

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
  },
});

export default FeedFavoriteScreen;
