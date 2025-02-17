import React, {ForwardedRef, forwardRef, useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TextInputProps,
  Text,
  Pressable,
} from 'react-native';
import {mergeRefs} from '@/utils';
import {colors} from '@/constants';

interface InputFieldProps extends TextInputProps {
  error?: string;
  touched?: boolean;
}

function InputField(
  {error, touched, ...props}: InputFieldProps,
  ref?: ForwardedRef<TextInput>,
) {
  const innerRef = useRef<TextInput | null>(null);

  const handlePressInput = () => {
    innerRef.current?.focus();
  };

  return (
    <Pressable onPress={handlePressInput}>
      <View
        style={[
          styles.container,
          touched && Boolean(error) && styles.inputError,
        ]}>
        <TextInput
          ref={ref ? mergeRefs(innerRef, ref) : innerRef}
          placeholderTextColor={colors.GRAY_500}
          style={styles.input}
          autoCapitalize="none"
          spellCheck={false}
          autoCorrect={false}
          {...props}
        />
        {touched && Boolean(error) && <Text style={styles.error}>{error}</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    padding: 15,
  },
  input: {
    fontSize: 16,
    color: colors.BLACK,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.RED_300,
  },
  error: {
    color: colors.RED_500,
    fontSize: 12,
    paddingTop: 5,
  },
});

export default forwardRef(InputField);
