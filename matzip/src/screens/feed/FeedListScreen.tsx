import React, {Suspense} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import FeedList from '@/components/feed/FeedList';
import Indicator from '@/components/common/Indicator';

function FeedListScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Suspense fallback={<Indicator size={'large'} />}>
        <FeedList />
      </Suspense>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedListScreen;
