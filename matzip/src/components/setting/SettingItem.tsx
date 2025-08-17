import React from 'react';
import {Pressable, PressableProps, StyleSheet, Text} from 'react-native';
import {colors} from '@/constants/colors';

interface SettingItemProps extends PressableProps {
  title: string;
  color?: string;
}

function SettingItem({title, color, ...props}: SettingItemProps) {
  return (
    <Pressable
      {...props}
      style={({pressed}) => [
        styles.container,
        pressed && styles.pressedContainer,
      ]}>
      <Text style={[styles.titleText, {color: color ?? colors.BLACK}]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    padding: 15,
    backgroundColor: colors.WHITE,
    borderColor: colors.GRAY_200,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  pressedContainer: {
    backgroundColor: colors.GRAY_200,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.BLACK,
  },
});

export default SettingItem;
