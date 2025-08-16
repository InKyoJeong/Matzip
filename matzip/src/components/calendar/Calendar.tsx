import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {colors} from '@/constants/colors';
import {MonthYear} from '@/utils/date';
import DayOfWeeks from './DayOfWeeks';
import DateBox from './DateBox';

interface CalendarProps {
  monthYear: MonthYear;
  onChangeMonth: (increment: number) => void;
}

function Calendar({monthYear, onChangeMonth}: CalendarProps) {
  const {month, year, firstDOW, lastDate} = monthYear;

  return (
    <>
      <View style={styles.headerContainer}>
        <Pressable style={styles.monthButton} onPress={() => onChangeMonth(-1)}>
          <Ionicons name="arrow-back" size={25} color={colors.BLACK} />
        </Pressable>
        <Pressable style={styles.monthYearContainer}>
          <Text style={styles.monthYearText}>
            {year}년 {month}월
          </Text>
        </Pressable>
        <Pressable style={styles.monthButton} onPress={() => onChangeMonth(1)}>
          <Ionicons name="arrow-forward" size={25} color={colors.BLACK} />
        </Pressable>
      </View>

      <DayOfWeeks />
      <View style={styles.bodyContainer}>
        <FlatList
          data={Array.from({length: lastDate + firstDOW}, (_, index) => ({
            id: index,
            date: index - firstDOW + 1,
          }))}
          renderItem={({item}) => <DateBox date={item.date} />}
          keyExtractor={item => String(item.id)}
          numColumns={7}
        />
      </View>
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
  monthButton: {
    padding: 10,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.BLACK,
  },
  bodyContainer: {
    backgroundColor: colors.GRAY_100,
    borderBottomColor: colors.GRAY_300,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Calendar;
