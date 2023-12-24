import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {mapNavigations} from '@/constants';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

function AddPostScreen({route}: AddPostScreenProps) {
  const {location} = route.params;

  return (
    <View>
      <Text>{location.latitude}</Text>
      <Text>{location.longitude}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default AddPostScreen;
