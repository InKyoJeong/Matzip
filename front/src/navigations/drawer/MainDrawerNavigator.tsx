import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigatorScreenParams} from '@react-navigation/native';

import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import MapStackNavigator, {MapStackParamList} from '../stack/MapStackNavigator';
import {mainNavigations} from '@/constants';

export type MainDrawerParamList = {
  [mainNavigations.HOME]: NavigatorScreenParams<MapStackParamList>;
  [mainNavigations.FEED]: undefined;
  [mainNavigations.CALENDAR]: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
      }}>
      <Drawer.Screen
        name={mainNavigations.HOME}
        component={MapStackNavigator}
        options={{
          title: '홈',
        }}
      />
      <Drawer.Screen
        name={mainNavigations.FEED}
        component={FeedHomeScreen}
        options={{
          title: '피드',
        }}
      />
      <Drawer.Screen
        name={mainNavigations.CALENDAR}
        component={CalendarHomeScreen}
        options={{
          title: '캘린더',
        }}
      />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
