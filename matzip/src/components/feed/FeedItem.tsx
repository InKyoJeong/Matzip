import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {baseUrls} from '@/api/axios';
import {colors} from '@/constants/colors';
import {Post} from '@/types/domain';
import {getDateWithSeparator} from '@/utils/date';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '@/types/navigation';
import useThemeStore, {Theme} from '@/store/theme';

interface FeedItemProps {
  post: Post;
}

function FeedItem({post}: FeedItemProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate('FeedDetail', {id: post.id})}>
      {post.imageUris.length > 0 && (
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: `${
                Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android
              }/${post.imageUris[0].uri}`,
            }}
            resizeMode="cover"
          />
        </View>
      )}
      {post.imageUris.length === 0 && (
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
    </Pressable>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
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
      borderColor: colors[theme].GRAY_200,
      borderWidth: 1,
      borderRadius: 5,
    },
    textContainer: {
      marginTop: 7,
      gap: 2,
    },
    dateText: {
      color: colors[theme].PINK_700,
      fontWeight: '600',
      fontSize: 12,
    },
    titleText: {
      color: colors[theme].BLACK,
      fontWeight: '500',
      fontSize: 13,
    },
    descriptionText: {
      color: colors[theme].GRAY_500,
      fontSize: 13,
    },
  });

export default FeedItem;
