import React, { useEffect } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { registerFCMToken } from './src/firebase/registerFCMToken';
import AppNavigator from './src/navigation/AppNavigator'; // 여기만 렌더링!

const App: React.FC = () => {
  useEffect(() => {
    console.log('🔥 App started');

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('📩 FCM 수신:', remoteMessage);
      Alert.alert(
        remoteMessage.notification?.title ?? '알림',
        remoteMessage.notification?.body ?? '내용 없음'
      );
    });

    registerFCMToken(1);

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppNavigator />
    </SafeAreaView>
  );
};

export default App;
