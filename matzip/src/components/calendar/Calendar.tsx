import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {colors} from '@/constants/colors';
import {MonthYear} from '@/utils/date';

interface CalendarProps {
  monthYear: MonthYear;
  onChangeMonth: (increment: number) => void;
}

function Calendar({monthYear, onChangeMonth}: CalendarProps) {
  const {month, year, firstDOW, lastDate} = monthYear;

  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={() => onChangeMonth(-1)}>
        <Ionicons name="arrow-back" size={25} color={colors.BLACK} />
      </Pressable>
      <Pressable>
        <Text>
          {year}년 {month}월
        </Text>
      </Pressable>
      <Pressable onPress={() => onChangeMonth(1)}>
        <Ionicons name="arrow-forward" size={25} color={colors.BLACK} />
      </Pressable>
    </View>
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
});

export default Calendar;
