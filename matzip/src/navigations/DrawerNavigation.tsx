import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import {FeedStack} from './FeedNavigation';
import {MapStack} from './MapNavigation';
import {SettingStack} from './SettingNavigation';
import CalendarScreen from '@/screens/calendar/CalendarScreen';
import DrawerButton from '@/components/common/DrawerButton';
import CustomDrawerContent from '@/components/common/CustomDrawerContent';
import {colors} from '@/constants/colors';
import useThemeStore, {Theme} from '@/store/theme';
import {MainDrawerParamList} from '@/types/navigation';

const Drawer = createDrawerNavigator();

type DrawerIconName = 'map' | 'book' | 'calendar';

function DrawerIcons(
  routeName: keyof MainDrawerParamList,
  focused: boolean,
  theme: Theme,
) {
  let iconName: DrawerIconName = 'map';

  switch (routeName) {
    case 'Map':
      iconName = 'map';
      break;
    case 'Feed':
      iconName = 'book';
      break;
    case 'Calendar':
      iconName = 'calendar';
      break;
  }

  return (
    <FontAwesome6
      name={iconName}
      iconStyle="solid"
      size={20}
      color={focused ? colors[theme].WHITE : colors[theme].GRAY_300}
    />
  );
}

export default function DrawerNavigation() {
  const {theme} = useThemeStore();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={({route}) => ({
        drawerStyle: {
          width: '60%',
          backgroundColor: colors[theme].WHITE,
        },
        drawerLabelStyle: {
          fontWeight: '600',
        },
        drawerItemStyle: {
          borderRadius: 5,
        },
        drawerType: 'front',
        drawerActiveTintColor: colors[theme].WHITE,
        drawerInactiveTintColor: colors[theme].GRAY_500,
        drawerActiveBackgroundColor: colors[theme].PINK_700,
        drawerInactiveBackgroundColor: colors[theme].GRAY_100,
        drawerIcon: ({focused}) =>
          DrawerIcons(route.name as keyof MainDrawerParamList, focused, theme),
        headerTitleAlign: 'center',
        headerBackButtonDisplayMode: 'minimal',
        headerTintColor: colors[theme].BLACK,
        headerStyle: {
          backgroundColor: colors[theme].WHITE,
          shadowColor: colors[theme].GRAY_500,
        },
        headerTitleStyle: {
          fontSize: 16,
        },
      })}>
      <Drawer.Screen
        name="Map"
        component={MapStack}
        options={{
          title: '홈',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Feed"
        component={FeedStack}
        options={{
          title: '피드',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          title: '캘린더',
          headerLeft: () => <DrawerButton />,
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingStack}
        options={{
          title: '설정',
          headerShown: false,
          drawerItemStyle: {height: 0},
        }}
      />
    </Drawer.Navigator>
  );
}
