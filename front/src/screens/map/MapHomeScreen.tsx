import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';

import useAuth from '@/hooks/queries/useAuth';

function MapHomeScreen() {
  const {logoutMutation} = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate(null);
  };

  return (
    <SafeAreaView>
      <Text>맵 스크린</Text>
      <Button title="로그아웃" onPress={handleLogout} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default MapHomeScreen;
