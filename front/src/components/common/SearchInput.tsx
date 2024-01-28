import React from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from '@/constants';

interface SearchInputProps extends TextInputProps {
  onSubmit: () => void;
}

function SearchInput({onSubmit, ...props}: SearchInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholderTextColor={colors.GRAY_500}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        clearButtonMode="while-editing"
        {...props}
      />
      <Ionicons
        name={'search'}
        color={colors.GRAY_700}
        size={20}
        onPress={onSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    paddingLeft: 0,
    color: colors.BLACK,
  },
});

export default SearchInput;
