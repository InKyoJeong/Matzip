import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';

import {colors} from '@/constants';

interface DateBoxProps {
  date: number;
  isToday: boolean;
  selectedDate: number;
  hasSchedule: boolean;
  onPressDate: (date: number) => void;
}

const deviceWidth = Dimensions.get('window').width;

function DateBox({
  date,
  selectedDate,
  hasSchedule,
  onPressDate,
  isToday,
}: DateBoxProps) {
  return (
    <Pressable style={styles.container} onPress={() => onPressDate(date)}>
      {date > 0 && (
        <>
          <View
            style={[
              styles.dateContainer,
              selectedDate === date && styles.selectedContainer,
              selectedDate === date && isToday && styles.selectedTodayContainer,
            ]}>
            <Text
              style={[
                styles.dateText,
                isToday && styles.todayText,
                selectedDate === date && styles.selectedDateText,
                selectedDate === date && isToday && styles.selectedTodayText,
              ]}>
              {date}
            </Text>
          </View>
          {hasSchedule && <View style={styles.scheduleIndicator} />}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: deviceWidth / 7,
    height: deviceWidth / 7,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_200,
    alignItems: 'center',
  },
  dateContainer: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 28,
  },
  selectedContainer: {
    backgroundColor: colors.BLACK,
  },
  selectedTodayContainer: {
    backgroundColor: colors.PINK_700,
  },
  dateText: {
    fontSize: 17,
    color: colors.BLACK,
  },
  todayText: {
    color: colors.PINK_700,
    fontWeight: 'bold',
  },
  selectedDateText: {
    color: colors.WHITE,
    fontWeight: 'bold',
  },
  selectedTodayText: {
    color: colors.WHITE,
  },
  scheduleIndicator: {
    marginTop: 2,
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: colors.GRAY_500,
  },
});

export default DateBox;
