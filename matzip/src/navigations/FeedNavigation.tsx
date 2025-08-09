import {createStackNavigator} from '@react-navigation/stack';

import DrawerButton from '@/components/common/DrawerButton';
import {colors} from '@/constants/colors';
import EditLocationScreen from '@/screens/feed/EditLocationScreen';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';
import FeedFavoriteScreen from '@/screens/feed/FeedFavoriteScreen';
import FeedListScreen from '@/screens/feed/FeedListScreen';

export const FeedStack = createStackNavigator({
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
    cardStyle: {
      backgroundColor: colors.WHITE,
    },
  },
  screens: {
    FeedList: {
      screen: FeedListScreen,
      options: {
        title: '피드',
        headerLeft: () => <DrawerButton />,
      },
    },
    FeedDetail: {
      screen: FeedDetailScreen,
      options: {
        headerShown: false,
      },
    },
    FeedFavorite: {
      screen: FeedFavoriteScreen,
    },
    EditLocation: {
      screen: EditLocationScreen,
    },
  },
});
