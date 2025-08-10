import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

import {ImageUri} from '@/types/domain';
import {colors} from '@/constants/colors';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {baseUrls} from '@/api/axios';

interface ImageCarouselProps {
  images: ImageUri[];
  pressedIndex?: number;
}

function ImageCarousel({images, pressedIndex}: ImageCarouselProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const deviceWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.backButton, {marginTop: insets.top + 10}]}
        onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={30} color={colors.WHITE} />
      </Pressable>

      <FlatList
        data={images}
        renderItem={({item}) => (
          <View style={{width: deviceWidth}}>
            <Image
              style={styles.image}
              source={{
                uri: `${
                  Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android
                }/${item.uri}`,
              }}
              resizeMode="contain"
            />
          </View>
        )}
        keyExtractor={item => String(item.id)}
        horizontal
        pagingEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.BLACK,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
    height: 40,
    width: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageCarousel;
