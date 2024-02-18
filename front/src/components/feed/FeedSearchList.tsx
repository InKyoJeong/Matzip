import React, {useState} from 'react';
import {FlatList, Keyboard, Pressable, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import useGetInfiniteSearchPosts from '@/hooks/queries/useGetInfiniteSearchPosts';
import SearchInput from '../common/SearchInput';
import FeedItem from './FeedItem';
import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';

function FeedSearchList() {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<DrawerNavigationProp<MainDrawerParamList>>();
  const [keyword, setKeyword] = useState('');
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteSearchPosts(keyword);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleChangeKeyword = (searchKeyword: string) => {
    setKeyword(searchKeyword);
  };

  return (
    <FlatList
      data={posts?.pages.flat()}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      renderItem={({item}) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      scrollIndicatorInsets={{right: 1}}
      contentContainerStyle={styles.contentContainer}
      indicatorStyle={theme === 'dark' ? 'white' : 'black'}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Pressable
            style={styles.drawerIconContainer}
            onPress={() => navigation.openDrawer()}>
            <Ionicons name={'menu'} color={colors[theme].BLACK} size={25} />
          </Pressable>
          <View style={styles.inputContainer}>
            <SearchInput
              autoFocus
              placeholder="주소 또는 제목으로 검색"
              value={keyword}
              onChangeText={handleChangeKeyword}
              onSubmit={() => Keyboard.dismiss()}
            />
          </View>
        </View>
      }
      stickyHeaderIndices={[0]}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      onScrollBeginDrag={() => Keyboard.dismiss()}
    />
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    contentContainer: {
      paddingHorizontal: 15,
    },
    headerContainer: {
      flexDirection: 'row',
      gap: 5,
      backgroundColor: colors[theme].WHITE,
      paddingHorizontal: 5,
      paddingTop: 5,
      paddingBottom: 10,
    },
    drawerIconContainer: {
      justifyContent: 'center',
      paddingHorizontal: 8,
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
      borderRadius: 5,
    },
    inputContainer: {
      flex: 1,
    },
  });

export default FeedSearchList;
