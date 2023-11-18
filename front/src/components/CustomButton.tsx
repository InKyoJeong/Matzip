import React, {ReactNode} from 'react';
import {
  StyleSheet,
  View,
  PressableProps,
  Pressable,
  Text,
  Dimensions,
  StyleProp,
} from 'react-native';
import {colors} from '../constants';

type Variant = 'filled' | 'outlined';
type Size = 'medium' | 'large';

interface CustomButtonProps extends PressableProps {
  label: string;
  variant?: Variant;
  size?: Size;
  inValid?: boolean;
}

const deviceHeight = Dimensions.get('window').height;

function CustomButton({
  label,
  variant = 'filled',
  size = 'large',
  inValid = false,
  ...props
}: CustomButtonProps) {
  console.log('window', Dimensions.get('window'));
  console.log('screen', Dimensions.get('screen'));

  return (
    <Pressable
      disabled={inValid}
      style={({pressed}) => [
        styles.container,
        pressed ? styles[`${variant}Pressed`] : styles[variant],
        styles[size],
        inValid && styles.inValid,
      ]}
      {...props}>
      <Text style={[styles.text, styles[`${variant}Text`]]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 3,
  },
  inValid: {
    opacity: 0.5,
  },
  medium: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: deviceHeight > 700 ? 12 : 8,
    width: '50%',
  },
  large: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: deviceHeight > 700 ? 15 : 10,
    width: '100%',
  },
  filled: {
    backgroundColor: colors.PINK_700,
  },
  outlined: {
    borderColor: colors.PINK_700,
    borderWidth: 1,
  },
  filledPressed: {
    backgroundColor: colors.PINK_500,
  },
  outlinedPressed: {
    borderColor: colors.PINK_700,
    borderWidth: 1,
    opacity: 0.5,
  },
  text: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: '700',
  },
  filledText: {
    color: colors.WHITE,
  },
  outlinedText: {
    color: colors.PINK_700,
  },
});

export default CustomButton;
