import React, {ReactNode} from 'react';
import {StyleSheet, Text, Pressable, PressableProps, View} from 'react-native';

import {colors} from '@/constants';

interface SettingItemProps extends PressableProps {
  title: string;
  subTitle?: string;
  icon?: ReactNode;
  color?: string;
}

function SettingItem({
  title,
  subTitle,
  icon = null,
  color,
  ...props
}: SettingItemProps) {
  return (
    <Pressable
      style={({pressed}) => [
        styles.container,
        pressed && styles.pressedContainer,
      ]}
      {...props}>
      {icon}
      <View style={styles.titleContainer}>
        <Text style={[styles.titleText, {color: color ?? colors.BLACK}]}>
          {title}
        </Text>
        {subTitle && <Text style={styles.subTitleText}>{subTitle}</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.BLACK,
  },
  subTitleText: {
    color: colors.GRAY_500,
  },
});

export default SettingItem;
