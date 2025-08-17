import {useQueryErrorResetBoundary} from '@tanstack/react-query';
import React, {PropsWithChildren} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {StyleSheet, Text, View} from 'react-native';
import CustomButton from './CustomButton';
import {colors} from '@/constants/colors';

function RetryErrorBoundary({children}: PropsWithChildren) {
  const {reset} = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({resetErrorBoundary}) => (
        <View style={styles.container}>
          <Text style={styles.titleText}>잠시 후 다시 시도해주세요.</Text>
          <Text style={styles.descriptionText}>
            요청 사항을 처리하는데 실패했습니다.
          </Text>
          <CustomButton
            label="다시 시도"
            variant="outlined"
            onPress={resetErrorBoundary}
            style={{width: '50%'}}
          />
        </View>
      )}>
      {children}
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: colors.WHITE,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.BLACK,
  },
  descriptionText: {
    fontSize: 15,
    color: colors.GRAY_500,
  },
});

export default RetryErrorBoundary;
