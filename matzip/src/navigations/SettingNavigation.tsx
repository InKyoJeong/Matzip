import DrawerButton from '@/components/common/DrawerButton';
import {colors} from '@/constants/colors';
import EditProfileScreen from '@/screens/setting/EditProfileScreen';
import SettingHomeScreen from '@/screens/setting/SettingHomeScreen';
import {createStackNavigator} from '@react-navigation/stack';

export const SettingStack = createStackNavigator({
  screenOptions: {
    headerTitleAlign: 'center',
    headerBackButtonDisplayMode: 'minimal',
    headerTintColor: colors.BLACK,
    headerStyle: {
      backgroundColor: colors.WHITE,
      shadowColor: colors.GRAY_500,
    },
    headerTitleStyle: {
      fontSize: 16,
    },
  },
  screens: {
    SettingHome: {
      screen: SettingHomeScreen,
      options: {
        title: '설정',
        headerLeft: () => <DrawerButton />,
        cardStyle: {
          backgroundColor: colors.GRAY_100,
        },
      },
    },
    EditProfile: {
      screen: EditProfileScreen,
      options: {
        title: '프로필 수정',
        cardStyle: {
          backgroundColor: colors.WHITE,
        },
      },
    },
  },
});
