import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {
  Image,
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

function CustomDrawerContent(props: DrawerContentComponentProps) {
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
              source={require('@/assets/default-user.png')}
              style={styles.userImage}
            />
          </View>
          <Text style={styles.nickname}>{auth.nickname}</Text>
        </Pressable>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.bottomContainer}>
        <Pressable
          onPress={() => navigation.navigate('Setting')}
          style={styles.bottomMenu}>
          <Ionicons name="settings-outline" size={20} color={colors.BLACK} />
          <Text style={styles.menuText}>설정</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.GRAY_200,
  },
  menuText: {
    fontSize: 15,
  },
  bottomMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
});

export default CustomDrawerContent;
