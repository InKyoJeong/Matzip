import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import {AuthStackParamList} from '@/types/navigation';
import CustomButton from '@/components/common/CustomButton';
import {colors} from '@/constants/colors';
import useThemeStore, {Theme} from '@/store/theme';

type Navigation = StackNavigationProp<AuthStackParamList>;

function AuthHomeScreen() {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<Navigation>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/matzip.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          label="카카오 로그인"
          style={styles.kakaoButtonContainer}
          textStyle={styles.kakaoButtonText}
          onPress={() => navigation.navigate('KakaoLogin')}
        />
        <CustomButton
          label="이메일 로그인"
          onPress={() => navigation.navigate('Login')}
        />
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.emailText}>이메일로 가입하기</Text>
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
    imageContainer: {
      flex: 1.5,
      alignItems: 'center',
    },
    image: {
      width: 200,
      height: '100%',
    },
    buttonContainer: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 30,
      gap: 5,
    },
    emailText: {
      textDecorationLine: 'underline',
      fontWeight: '500',
      padding: 10,
      color: colors[theme].BLACK,
    },
    kakaoButtonContainer: {
      backgroundColor: '#fee503',
    },
    kakaoButtonText: {
      color: '#181600',
    },
  });

export default AuthHomeScreen;
