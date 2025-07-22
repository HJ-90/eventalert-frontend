// ① React import: TSX 문법 지원을 위해 React 타입 불러오기
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { usePushNotifications } from './src/hooks/usePushNotifications';  // 경로 확인


const App: React.FC = () => {
  const { expoPushToken, permissionStatus } = usePushNotifications();

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