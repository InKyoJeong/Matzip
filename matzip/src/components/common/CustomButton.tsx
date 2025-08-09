import React, {ReactNode} from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

import {colors} from '@/constants/colors';

interface CustomButtonProps extends PressableProps {
  label: string | ReactNode;
  variant?: 'filled' | 'outlined';
  size?: 'large' | 'small';
  style?: StyleProp<ViewStyle>;
}

function CustomButton({
  label,
  variant = 'filled',
  size = 'large',
  style = null,
  ...props
}: CustomButtonProps) {
  return (
    <Pressable
      style={({pressed}) => [
        styles.container,
        styles[variant],
        styles[size],
        pressed && styles.pressed,
        style,
      ]}
      {...props}>
      {typeof label === 'string' ? (
        <Text style={styles[`${variant}Text`]}>{label}</Text>
      ) : (
        label
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filled: {
    backgroundColor: colors.PINK_700,
  },
  outlined: {
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.PINK_700,
  },
  filledText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.WHITE,
  },
  outlinedText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.PINK_700,
  },
  large: {
    width: '100%',
    height: 45,
  },
  small: {
    paddingHorizontal: 10,
    height: 35,
  },
  pressed: {
    opacity: 0.8,
  },
});

export default CustomButton;
