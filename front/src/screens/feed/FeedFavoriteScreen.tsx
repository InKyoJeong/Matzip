import React, {Suspense} from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';

import {colors} from '@/constants';
import FeedFavoriteList from '@/components/feed/FeedFavoriteList';
import {ThemeMode} from '@/types';
import useThemeStore from '@/store/useThemeStore';
import Loader from '@/components/common/Loader';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';

function FeedFavoriteScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <SafeAreaView style={styles.container}>
      <RetryErrorBoundary>
        <Suspense fallback={<Loader />}>
          <FeedFavoriteList />
        </Suspense>
      </RetryErrorBoundary>
    </SafeAreaView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },
  });
export default FeedFavoriteScreen;
