import React from 'react';
import {FlatList, StyleSheet, View, Pressable, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {MonthYear} from '@/utils';
import {colors} from '@/constants';
import DayOfWeeks from './DayOfWeeks';
import DateBox from './DateBox';

interface CalendarProps {
  monthYear: MonthYear;
  onChangeMonth: (increment: number) => void;
}

function Calendar({monthYear, onChangeMonth}: CalendarProps) {
  const {lastDate, firstDOW, year, month} = monthYear;

  return (
    <>
      <View style={styles.headerContainer}>
        <Pressable
          onPress={() => onChangeMonth(-1)}
          style={styles.monthButtonContainer}>
          <Ionicons
            name="arrow-up-circle-outline"
            size={25}
            color={colors.BLACK}
          />
        </Pressable>
        <Pressable style={styles.monthYearContainer}>
          <Text style={styles.titleText}>
            {year}년 {month}월
          </Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={20}
            color={colors.GRAY_500}
          />
        </Pressable>
        <Pressable
          onPress={() => onChangeMonth(1)}
          style={styles.monthButtonContainer}>
          <Ionicons
            name="arrow-down-circle-outline"
            size={25}
            color={colors.BLACK}
          />
        </Pressable>
      </View>

      <DayOfWeeks />
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginVertical: 16,
  },
  monthYearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  monthButtonContainer: {
    padding: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.BLACK,
  },
});

export default Calendar;
