import Calendar from '@/components/calendar/Calendar';
import {colors} from '@/constants';
import {getMonthYearDetails, getNewMonthYear} from '@/utils';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

function CalendarHomeScreen() {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState(0);

  const handlePressDate = (date: number) => {
    setSelectedDate(date);
  };

  const handleUpdateMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        monthYear={monthYear}
        onChangeMonth={handleUpdateMonth}
        selectedDate={selectedDate}
        onPressDate={handlePressDate}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default CalendarHomeScreen;
