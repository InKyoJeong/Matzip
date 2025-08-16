import {colors} from '@/constants/colors';
import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';

interface DateBoxProps {
  date: number;
}

const deviceWidth = Dimensions.get('window').width;

function DateBox({date}: DateBoxProps) {
  return (
    <Pressable style={styles.container}>
      {date > 0 && (
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{date}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: deviceWidth / 7,
    height: deviceWidth / 7,
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
  dateText: {
    fontSize: 17,
    color: colors.BLACK,
  },
});

export default DateBox;
