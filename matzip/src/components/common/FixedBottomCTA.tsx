import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomButton from './CustomButton';
import {colors} from '@/constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useThemeStore, {Theme} from '@/store/theme';

interface FixedBottomCTAProps {
  label: string;
  onPress: () => void;
}

function FixedBottomCTA({label, onPress}: FixedBottomCTAProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const inset = useSafeAreaInsets();

  return (
    <View style={[styles.fixed, {paddingBottom: inset.bottom || 12}]}>
      <CustomButton label={label} onPress={onPress} />
    </View>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    fixed: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      paddingTop: 12,
      paddingHorizontal: 16,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors[theme].GRAY_300,
    },
  });

export default FixedBottomCTA;
