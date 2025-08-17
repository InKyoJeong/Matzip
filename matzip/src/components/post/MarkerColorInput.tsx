import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors} from '@/constants/colors';
import CustomMarker from '../common/CustomMarker';
import useThemeStore, {Theme} from '@/store/theme';

interface MarkerColorInputProps {
  color: string;
  score: number;
  onChangeColor: (value: string) => void;
}

function MarkerColorInput({
  color,
  score,
  onChangeColor,
}: MarkerColorInputProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.markerLabel}>마커선택</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.markerInputScroll}>
          {[
            colors[theme].PINK_400,
            colors[theme].BLUE_400,
            colors[theme].YELLOW_400,
            colors[theme].GREEN_400,
            colors[theme].PURPLE_400,
          ].map(selectColor => {
            return (
              <Pressable
                key={selectColor}
                style={[
                  styles.markerBox,
                  color === selectColor && styles.pressedMarker,
                ]}
                onPress={() => onChangeColor(selectColor)}>
                <CustomMarker color={selectColor} score={score} />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styling = (theme: Theme) =>
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
      borderRadius: 6,
      backgroundColor: colors[theme].GRAY_100,
    },
    pressedMarker: {
      borderWidth: 2,
      borderColor: colors[theme].RED_500,
    },
  });

export default MarkerColorInput;
