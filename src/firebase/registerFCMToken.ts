import messaging from '@react-native-firebase/messaging';
import axios from 'axios';

export async function registerFCMToken(userId: number) {
  try {
    // 알림 권한 요청
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      console.log('❌ 알림 권한이 거부됨');
      return;
    }

    // FCM 토큰 가져오기
    const fcmToken = await messaging().getToken();
    console.log('✅ FCM Token:', fcmToken);

    // 백엔드 서버로 토큰 전송
    await axios.post('http://192.168.0.16:8080/register-token', {
      fcmToken,
      userId,
    });

    console.log('📡 FCM 토큰 백엔드 전송 성공');
  } catch (error) {
    console.log('🚨 FCM 등록 중 오류 발생:', error);
  }
}
