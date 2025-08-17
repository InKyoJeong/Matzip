import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';

import {colors} from '@/constants/colors';
import useAuth from '@/hooks/queries/useAuth';
import {baseUrls} from '@/api/axios';
import useThemeStore, {Theme} from '@/store/theme';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {auth} = useAuth();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}>
        <Pressable style={styles.profileContainer}>
          <View style={styles.userImageContainer}>
            <Image
              source={
                auth.imageUri
                  ? {
                      uri: `${
                        Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android
                      }/${auth.imageUri}`,
                    }
                  : require('@/assets/default-user.png')
              }
              style={styles.userImage}
            />
          </View>
          <Text style={styles.nickname}>{auth.nickname}</Text>
        </Pressable>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.bottomContainer}>
        <Pressable
          style={styles.bottomMenu}
          onPress={() => navigation.navigate('Setting')}>
          <Ionicons
            name="settings-outline"
            size={20}
            color={colors[theme].BLACK}
          />
          <Text style={styles.menuText}>설정</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      gap: 5,
      marginTop: 30,
    },
    profileContainer: {
      alignItems: 'center',
      marginBottom: 30,
      gap: 5,
    },
    userImageContainer: {
      width: 70,
      height: 70,
      borderRadius: 35,
    },
    userImage: {
      width: '100%',
      height: '100%',
      borderRadius: 35,
    },
    nickname: {
      fontSize: 14,
      color: colors[theme].BLACK,
    },
    bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: colors[theme].GRAY_200,
    },
    menuText: {
      fontSize: 15,
      color: colors[theme].BLACK,
    },
    bottomMenu: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
    },
  });

export default CustomDrawerContent;
