import {colors} from '@/constants';
import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

interface CustomButtonProps extends PressableProps {
  label: string;
  size?: 'medium' | 'large';
  variant?: 'standard' | 'filled' | 'outlined';
  style?: StyleProp<ViewStyle>;
}

function CustomButton({
  label,
  size = 'large',
  variant = 'filled',
  style = null,
  ...props
}: CustomButtonProps) {
  return (
    <Pressable
      style={({pressed}) => [
        styles.container,
        styles[size],
        styles[variant],
        props.disabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
      {...props}>
      <Text style={styles[`${variant}Text`]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  large: {
    width: '100%',
    height: 45,
  },
  medium: {},
  filled: {
    backgroundColor: colors.PINK_700,
  },
  standard: {},
  outlined: {
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.PINK_700,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    backgroundColor: colors.GRAY_300,
  },
  standardText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.PINK_700,
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
});

export default CustomButton;
