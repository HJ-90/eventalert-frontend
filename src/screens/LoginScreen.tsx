import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { login } from '../services/authService';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    try {
      const token = await login(username, password);
      console.log('JWT 토큰:', token);

      // ✅ JWT 토큰 AsyncStorage에 저장
      await AsyncStorage.setItem('token', token);

      console.log('✅ 화면 이동 시도')
      navigation.navigate('Dashboard'); // 💡 여기 핵심

    } catch (error) {
      console.error('로그인 에러:', error);
      Alert.alert('로그인 실패', '아이디 또는 서버 오류를 확인하세요');
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-4">
      <Text className="text-2xl font-bold mb-6">관리자 로그인</Text>

      <TextInput
        className="w-full border rounded-xl p-3 mb-4"
        placeholder="아이디"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        className="w-full border rounded-xl p-3 mb-4"
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View className="flex-row items-center mb-4">
        <Switch value={autoLogin} onValueChange={setAutoLogin} />
        <Text className="ml-2">자동 로그인</Text>
      </View>

      <Button title="로그인" onPress={handleLogin} />
    </View>
  );
}
