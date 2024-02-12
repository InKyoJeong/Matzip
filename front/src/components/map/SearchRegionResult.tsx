import {colors} from '@/constants';
import {RegionInfo} from '@/hooks/useSearchLocation';
import useLocationStore from '@/store/useLocationStore';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, Pressable, ScrollView, Text} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {LatLng} from 'react-native-maps';
import Octicons from 'react-native-vector-icons/Octicons';

interface SearchRegionResultProps {
  regionInfo: RegionInfo[];
}

function SearchRegionResult({regionInfo}: SearchRegionResultProps) {
  const navigation = useNavigation();
  const {setMoveLocation, setSelectLocation} = useLocationStore();

  const handlePressRegionInfo = (latitude: string, longitude: string) => {
    const regionLocation = {
      latitude: Number(latitude),
      longitude: Number(longitude),
    };

    moveToMapScreen(regionLocation);
  };

  const moveToMapScreen = (regionLocation: LatLng) => {
    navigation.goBack();

    setMoveLocation(regionLocation);
    setSelectLocation(regionLocation);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator
        indicatorStyle="black"
        contentContainerStyle={styles.scrollContainer}>
        {regionInfo.map((info, index) => (
          <Pressable
            key={info.id}
            style={[
              styles.itemBorder,
              index === regionInfo.length - 1 && styles.noItemBorder,
            ]}
            onPress={() => handlePressRegionInfo(info.y, info.x)}>
            <View style={styles.placeNameContainer}>
              <Octicons name="location" size={15} color={colors.PINK_700} />
              <Text
                style={styles.placeText}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {info.place_name}
              </Text>
            </View>
            <View style={styles.categoryContainer}>
              <Text style={styles.distanceText}>
                {(Number(info.distance) / 1000).toFixed(2)}km
              </Text>
              <Text style={styles.subInfoText}>{info.category_name}</Text>
            </View>
            <Text style={styles.subInfoText}>{info.road_address_name}</Text>
          </Pressable>
        ))}

        {regionInfo.length === 0 && (
          <View style={styles.noResultContainer}>
            <Text style={styles.noResultText}>검색 결과가 없습니다.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    borderRadius: 5,
    height: Dimensions.get('screen').height / 2,
    marginVertical: 5,
    width: '100%',
  },
  scrollContainer: {
    padding: 10,
  },
  placeNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  placeText: {
    color: colors.BLACK,
    flexShrink: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  distanceText: {
    color: colors.BLACK,
  },
  subInfoText: {
    flexShrink: 1,
    color: colors.GRAY_500,
  },
  itemBorder: {
    marginHorizontal: 5,
    paddingVertical: 10,
    borderBottomColor: colors.GRAY_300,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 3,
  },
  noItemBorder: {
    borderBottomWidth: 0,
  },
  noResultContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  noResultText: {
    color: colors.GRAY_500,
    fontSize: 16,
  },
});

export default SearchRegionResult;
