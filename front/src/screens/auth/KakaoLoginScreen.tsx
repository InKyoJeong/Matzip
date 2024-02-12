import axios from 'axios';
import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import Config from 'react-native-config';

import useAuth from '@/hooks/queries/useAuth';
import {colors} from '@/constants';

const REDIRECT_URI = `http://localhost:3030/auth/oauth/kakao`;
const INJECTED_JAVASCRIPT = "window.ReactNativeWebView.postMessage('')";

function KakaoLoginScreen() {
  const {kakaoLoginMutation} = useAuth();

  const handleOnMessage = (event: WebViewMessageEvent) => {
    if (event.nativeEvent.url.includes(`${REDIRECT_URI}?code=`)) {
      const code = event.nativeEvent.url.replace(`${REDIRECT_URI}?code=`, '');

      requestToken(code);
    }
  };

  const requestToken = async (code: string) => {
    const response = await axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      params: {
        grant_type: 'authorization_code',
        client_id: Config.KAKAO_REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      },
    });

    kakaoLoginMutation.mutate(response.data.access_token);
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.container}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        onMessage={handleOnMessage}
        injectedJavaScript={INJECTED_JAVASCRIPT}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  kakaoLoadingContiner: {
    backgroundColor: colors.WHITE,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default KakaoLoginScreen;
