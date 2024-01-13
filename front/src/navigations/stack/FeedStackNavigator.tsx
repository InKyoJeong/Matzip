import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import {colors, feedNavigations} from '@/constants';
import FeedHomeHeaderLeft from '@/components/FeedHomeHeaderLeft';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';

export type FeedStackParamList = {
  [feedNavigations.FEED_HOME]: undefined;
  [feedNavigations.FEED_DETAIL]: {id: number};
};

const Stack = createStackNavigator<FeedStackParamList>();

function FeedStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.WHITE,
          shadowColor: colors.GRAY_200,
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: colors.BLACK,
        cardStyle: {
          backgroundColor: colors.WHITE,
        },
      }}>
      <Stack.Screen
        name={feedNavigations.FEED_HOME}
        component={FeedHomeScreen}
        options={{
          headerTitle: '피드',
          cardStyle: {
            backgroundColor: colors.WHITE,
          },
        }}
      />
      <Stack.Screen
        name={feedNavigations.FEED_DETAIL}
        component={FeedDetailScreen}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: colors.GRAY_100,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default FeedStackNavigator;
