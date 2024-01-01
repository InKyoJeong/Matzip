import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {ImageUri} from '@/types';

interface PreviewImageListProps {
  imageUris: ImageUri[];
}

function PreviewImageList({imageUris}: PreviewImageListProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {imageUris.map(({uri}, index) => {
          return (
            <View key={uri} style={styles.imageContainer}>
              <Pressable>
                <Image
                  style={styles.image}
                  source={{
                    uri: `${
                      Platform.OS === 'ios'
                        ? 'http://localhost:3030/'
                        : 'http://10.0.2.2:3030/'
                    }${uri}`,
                  }}
                  resizeMode="cover"
                />
              </Pressable>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    gap: 15,
  },
  imageContainer: {
    width: 70,
    height: 70,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default PreviewImageList;
