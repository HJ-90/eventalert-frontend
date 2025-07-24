// ① React import: TSX 문법 지원을 위해 React 타입 불러오기
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { usePushNotifications } from './src/hooks/usePushNotifications';  // 경로 확인
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { registerFCMToken } from './src/firebase/registerFCMToken';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,   // 🔔 포그라운드에서도 표시하게 만듦
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App: React.FC = () => {
  const { expoPushToken, permissionStatus } = usePushNotifications();


  useEffect(() => {
      const subscription = Notifications.addNotificationReceivedListener(
          notification => {
                const title = notification.request.content.title;
                const body = notification.request.content.body;
                console.log('🔔 알림 수신:', notification);
                Alert.alert(title ?? '알림', body ?? '내용 없음');
      });

  registerFCMToken(1);

      return () => subscription.remove();
    }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Permission: {permissionStatus}</Text>
      <Text>Expo Push Token:</Text>
      <Text selectable>{expoPushToken ?? '발급 대기 중...'}</Text>
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