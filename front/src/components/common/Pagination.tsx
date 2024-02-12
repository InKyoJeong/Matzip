import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

import {colors} from '@/constants';

interface PaginationProps {
  pageParam: number;
  fetchPrevPage: () => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  totalLength: number;
}

function Pagination({
  pageParam,
  fetchPrevPage,
  fetchNextPage,
  hasNextPage,
  totalLength,
}: PaginationProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={fetchPrevPage}
        style={styles.pageButton}
        disabled={pageParam <= 1}>
        <Octicons
          name="arrow-left"
          size={15}
          color={pageParam > 1 ? colors.BLACK : colors.GRAY_300}
          onPress={fetchPrevPage}
          disabled={pageParam <= 1}
        />
        <Text style={pageParam > 1 ? styles.pageText : styles.disabledPageText}>
          이전페이지
        </Text>
      </Pressable>

      <Pressable
        onPress={fetchNextPage}
        style={styles.pageButton}
        disabled={totalLength === 0 || !hasNextPage}>
        <Text
          style={
            totalLength > 0 && hasNextPage
              ? styles.pageText
              : styles.disabledPageText
          }>
          다음페이지
        </Text>
        <Octicons
          name="arrow-right"
          size={15}
          color={
            totalLength > 0 && hasNextPage ? colors.BLACK : colors.GRAY_300
          }
          onPress={fetchNextPage}
          disabled={totalLength === 0 || !hasNextPage}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 5,
  },
  pageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 25,
  },
  pageText: {
    fontSize: 15,
    color: colors.BLACK,
  },
  disabledPageText: {
    fontSize: 15,
    color: colors.GRAY_300,
  },
});

export default Pagination;
