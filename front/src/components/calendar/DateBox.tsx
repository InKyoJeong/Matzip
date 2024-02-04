import {colors} from '@/constants';
import React from 'react';
import {Dimensions, Pressable, Text} from 'react-native';
import {StyleSheet, View} from 'react-native';

interface DateBoxProps {
  date: number;
  selectedDate: number;
  onPressDate: (date: number) => void;
  isToday: boolean;
}

const deviceWidth = Dimensions.get('window').width;

function DateBox({date, selectedDate, onPressDate, isToday}: DateBoxProps) {
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
              ]}>
              {date}
            </Text>
          </View>
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
});

export default DateBox;
