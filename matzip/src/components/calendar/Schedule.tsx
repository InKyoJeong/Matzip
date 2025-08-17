import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {colors} from '@/constants/colors';
import useThemeStore, {Theme} from '@/store/theme';

interface ScheduleProps {
  subTitle: string;
  title: string;
  onPress: () => void;
}

function Schedule({subTitle, title, onPress}: ScheduleProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.line} />
      <View style={styles.infoContainer}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.subTitleText}>
          {subTitle}
        </Text>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    line: {
      backgroundColor: colors[theme].PINK_700,
      width: 6,
      height: 50,
      marginRight: 8,
      borderRadius: 20,
    },
    infoContainer: {
      justifyContent: 'space-evenly',
    },
    subTitleText: {
      color: colors[theme].GRAY_500,
      fontSize: 13,
    },
    titleText: {
      color: colors[theme].BLACK,
      fontSize: 16,
      fontWeight: '600',
    },
  });

export default Schedule;
