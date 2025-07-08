import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {FeedStackParamList} from '@/types/navigation';

type Props = StackScreenProps<FeedStackParamList, 'FeedDetail'>;

function FeedDetailScreen({route}: Props) {
  const {id} = route.params;

  return (
    <SafeAreaView>
      <Text>FeedDetailScreen {id}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default FeedDetailScreen;
