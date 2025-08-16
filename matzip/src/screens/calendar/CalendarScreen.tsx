import React, {useEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Calendar from '@/components/calendar/Calendar';
import {colors} from '@/constants/colors';
import {getMonthYearDetails, getNewMonthYear} from '@/utils/date';
import Schedule from '@/components/calendar/Schedule';
import useGetCalendarPosts from '@/hooks/queries/useGetCalendarPosts';

function CalendarScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState(0);
  const {
    data: posts,
    isPending,
    isError,
  } = useGetCalendarPosts(monthYear.year, monthYear.month);

  const moveToToday = () => {
    setSelectedDate(new Date().getDate());
    setMonthYear(getMonthYearDetails(new Date()));
  };

  const handleUpdateMonth = (increment: number) => {
    setSelectedDate(0);
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={moveToToday} style={{paddingHorizontal: 10}}>
          <Text style={{color: colors.PINK_700, fontWeight: 'bold'}}>오늘</Text>
        </Pressable>
      ),
    });
  }, [navigation, moveToToday]);

  if (isPending || isError) {
    return <></>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        monthYear={monthYear}
        onChangeMonth={handleUpdateMonth}
        selectedDate={selectedDate}
        onPressDate={(date: number) => setSelectedDate(date)}
      />
      <ScrollView style={styles.scheduleContainer}>
        <View style={[{gap: 20}, {marginBottom: insets.bottom + 30}]}>
          {posts[selectedDate]?.map(post => (
            <Schedule
              key={post.id}
              subTitle={post.address}
              title={post.title}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  scheduleContainer: {
    backgroundColor: colors.WHITE,
    padding: 20,
  },
});

export default CalendarScreen;
