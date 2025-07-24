// ① React import: TSX 문법 지원을 위해 React 타입 불러오기
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { registerFCMToken } from './src/firebase/registerFCMToken';


const App: React.FC = () => {
  useEffect(() => {
    // FCM 수신 리스너
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('📩 FCM 수신:', remoteMessage);
      Alert.alert(
        remoteMessage.notification?.title ?? '알림',
        remoteMessage.notification?.body ?? '내용 없음'
      );
    });

  registerFCMToken(1);

      return () => subscription.remove();
    }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Firebase 푸시 테스트</Text>
    </View>
  );
};

export default App;

// ③ 스타일 시트에 타입 안전하게 정의
const styles = StyleSheet.create({
  container: {
    flex: 1 as number,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
});