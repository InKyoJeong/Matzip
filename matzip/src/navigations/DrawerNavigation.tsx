import {createDrawerNavigator} from '@react-navigation/drawer';
import MapHomeScreen from '../screens/map/MapHomeScreen';
import FeedListScreen from '../screens/feed/FeedListScreen';
import CalendarScreen from '../screens/calendar/CalendarScreen';
import {createStaticNavigation} from '@react-navigation/native';
import {MapStack} from './MapNavigation';
import {FeedStack} from './FeedNavigation';

const MainDrawer = createDrawerNavigator({
  screens: {
    Map: {
      screen: MapStack,
    },
    Feed: {
      screen: FeedStack,
    },
    Calendar: {
      screen: CalendarScreen,
    },
  },
});

const DrawerNavigation = createStaticNavigation(MainDrawer);

export default DrawerNavigation;
