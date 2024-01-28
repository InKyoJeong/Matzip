import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import Calendar from '@/components/calendar/Calendar';
import {getMonthYearDetails, getNewMonthYear} from '@/utils';
import {colors} from '@/constants';

function CalendarHomeScreen() {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);

  const handleUpdateMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar monthYear={monthYear} onChangeMonth={handleUpdateMonth} />
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
