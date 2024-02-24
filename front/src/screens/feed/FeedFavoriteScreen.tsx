import React, {Suspense} from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';

import {colors} from '@/constants';
import FeedFavoriteList from '@/components/feed/FeedFavoriteList';
import {ThemeMode} from '@/types';
import useThemeStore from '@/store/useThemeStore';
import Indicator from '@/components/common/Indicator';

function FeedFavoriteScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <SafeAreaView style={styles.container}>
      <Suspense fallback={<Indicator />}>
        <FeedFavoriteList />
      </Suspense>
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
