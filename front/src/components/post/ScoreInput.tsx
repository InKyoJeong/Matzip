import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Slider from '@react-native-community/slider';

import {colors} from '@/constants';
import {ThemeMode} from '@/types';
import useThemeStore from '@/store/useThemeStore';

interface ScoreInputProps {
  score: number;
  onChangeScore: (value: number) => void;
}

function ScoreInput({score, onChangeScore}: ScoreInputProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>평점</Text>
        <Text style={styles.labelText}>{score}점</Text>
      </View>
      <Slider
        value={score}
        onValueChange={onChangeScore}
        step={1}
        minimumValue={1}
        maximumValue={5}
        minimumTrackTintColor={colors[theme].PINK_700}
        maximumTrackTintColor={colors[theme].GRAY_300}
        thumbTintColor={colors[theme].GRAY_100}
      />
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
    },
    labelContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    labelText: {
      color: colors[theme].GRAY_700,
    },
  });

export default ScoreInput;
