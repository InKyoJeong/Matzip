import React from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from '@/constants';
import {ThemeMode} from '@/types';
import useThemeStore from '@/store/useThemeStore';

interface SearchInputProps extends TextInputProps {
  onSubmit: () => void;
}

function SearchInput({onSubmit, ...props}: SearchInputProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholderTextColor={colors[theme].GRAY_500}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        clearButtonMode="while-editing"
        {...props}
      />
      <Ionicons
        name={'search'}
        color={colors[theme].GRAY_700}
        size={20}
        onPress={onSubmit}
      />
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    input: {
      flex: 1,
      fontSize: 16,
      paddingVertical: 0,
      paddingLeft: 0,
      color: colors[theme].BLACK,
    },
  });

export default SearchInput;
