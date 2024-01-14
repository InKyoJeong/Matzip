import FeedList from '@/components/FeedList';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

function FeedHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FeedList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedHomeScreen;
