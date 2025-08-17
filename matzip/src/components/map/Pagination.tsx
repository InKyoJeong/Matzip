import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {colors} from '@/constants/colors';
import useThemeStore, {Theme} from '@/store/theme';

interface PaginationProps {
  pageParam: number;
  fetchPrevPage: () => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  totalLength: number;
}

function Pagination({
  pageParam,
  fetchNextPage,
  fetchPrevPage,
  hasNextPage,
  totalLength,
}: PaginationProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pageButton}
        disabled={pageParam <= 1}
        onPress={fetchPrevPage}>
        <Ionicons
          name="chevron-back"
          size={15}
          color={pageParam > 1 ? colors[theme].BLACK : colors[theme].GRAY_300}
        />
        <Text style={pageParam > 1 ? styles.pageText : styles.disabledText}>
          이전페이지
        </Text>
      </Pressable>
      <Pressable
        style={styles.pageButton}
        disabled={totalLength === 0 || !hasNextPage}
        onPress={fetchNextPage}>
        <Ionicons
          name="chevron-forward"
          size={15}
          color={
            totalLength > 0 && hasNextPage
              ? colors[theme].BLACK
              : colors[theme].GRAY_300
          }
        />
        <Text
          style={
            totalLength > 0 && hasNextPage
              ? styles.pageText
              : styles.disabledText
          }>
          다음페이지
        </Text>
      </Pressable>
    </View>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    pageButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      height: 25,
    },
    pageText: {
      fontSize: 15,
      color: colors[theme].BLACK,
    },
    disabledText: {
      fontSize: 15,
      color: colors[theme].GRAY_300,
    },
  });

export default Pagination;
