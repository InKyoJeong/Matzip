import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  PressableProps,
  ScrollView,
} from 'react-native';

import {colors} from '@/constants';
import type {MarkerColor, ThemeMode} from '@/types';
import CustomMarker from '../common/CustomMarker';
import useThemeStore from '@/store/useThemeStore';

interface MarkerSelectorProps extends PressableProps {
  markerColor: MarkerColor;
  onPressMarker: (name: MarkerColor) => void;
  score?: number;
}

const categoryList: MarkerColor[] = [
  'RED',
  'YELLOW',
  'GREEN',
  'BLUE',
  'PURPLE',
];

const MarkerSelector = ({
  markerColor,
  score = 5,
  onPressMarker,
}: MarkerSelectorProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.markerLabel}>마커선택</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.markerInputScroll}>
          {categoryList.map(color => {
            return (
              <Pressable
                key={color}
                style={[
                  styles.markerBox,
                  markerColor === color && styles.pressedMarker,
                ]}
                onPress={() => onPressMarker(color)}>
                <CustomMarker color={color} score={score} />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
      padding: 15,
    },
    markerInputScroll: {
      flexDirection: 'row',
      gap: 20,
    },
    markerLabel: {
      marginBottom: 15,
      color: colors[theme].GRAY_700,
    },
    markerBox: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      backgroundColor: colors[theme].GRAY_100,
      borderRadius: 6,
    },
    pressedMarker: {
      borderWidth: 2,
      borderColor: colors[theme].RED_500,
    },
  });

export default MarkerSelector;
