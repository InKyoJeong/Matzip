import React from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import {colors} from '@/constants/colors';

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
        {...props}
      />
      <FontAwesome6
        name="magnifying-glass"
        iconStyle="solid"
        size={20}
        color={colors.BLACK}
        onPress={onSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    padding: 10,
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
