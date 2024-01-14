import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ResponsePost} from '@/api';
import {colors} from '@/constants';
import {getDateWithSeparator} from '@/utils';

interface FeedItemProps {
  post: ResponsePost;
}

function FeedItem({post}: FeedItemProps) {
  return (
    <View style={styles.container}>
      <View>
        {post.images.length > 0 && (
          <View key={post.id} style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: `${
                  Platform.OS === 'ios'
                    ? 'http://localhost:3030/'
                    : 'http://10.0.2.2:3030/'
                }${post.images[0]?.uri}`,
              }}
              resizeMode="cover"
            />
          </View>
        )}
        {post.images.length === 0 && (
          <View style={[styles.imageContainer, styles.emptyImageContainer]}>
            <Text style={styles.descriptionText}>No Image</Text>
          </View>
        )}

        <View style={styles.textContainer}>
          <Text style={styles.dateText}>
            {getDateWithSeparator(post.date, '/')}
          </Text>
          <Text style={styles.titleText}>{post.title}</Text>
          <Text style={styles.descriptionText} numberOfLines={1}>
            {post.description}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    marginVertical: 12,
  },
  imageContainer: {
    width: Dimensions.get('screen').width / 2 - 25,
    height: Dimensions.get('screen').width / 2 - 25,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  emptyImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.GRAY_200,
    borderRadius: 5,
    borderWidth: 1,
  },
  textContainer: {
    marginTop: 7,
    gap: 2,
  },
  dateText: {
    color: colors.PINK_700,
    fontWeight: '600',
    fontSize: 12,
  },
  titleText: {
    color: colors.BLACK,
    fontWeight: '500',
    fontSize: 13,
  },
  descriptionText: {
    color: colors.GRAY_500,
    fontSize: 13,
  },
});

export default FeedItem;
