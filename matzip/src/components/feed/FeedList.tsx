import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';
import FeedItem from './FeedItem';

function FeedList() {
  const {data: posts} = useGetInfinitePosts();

  return (
    <FlatList
      data={posts?.pages.flat()}
      renderItem={({item}) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});

export default FeedList;
