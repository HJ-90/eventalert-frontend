// src/hooks/usePushNotifications.ts
import axios from 'axios';
import { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

type PermissionStatus = 'undetermined' | 'granted' | 'denied';

export function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>('undetermined');

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if (token) setExpoPushToken(token);
    });

    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    return () => subscription.remove();
  }, []);

  async function registerForPushNotificationsAsync(): Promise<string | null> {
    // 1) 기존 권한 상태 조회
    console.log('🔍 [Debug] checking existing permissions');
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    console.log('🔍 [Debug] existingStatus =', existingStatus);

    // 2) 권한이 없으면 요청
    let finalStatus = existingStatus as PermissionStatus;
    if (existingStatus !== 'granted') {
      console.log('🔍 [Debug] requesting permissions');
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
      console.log('🔍 [Debug] requestedStatus =', status);
    }
    setPermissionStatus(finalStatus);

    if (finalStatus !== 'granted') {
      console.log('❌ Push notification permission not granted');
      return null;
    }

    const backendUrl = Constants.expoConfig?.extra?.backendUrl;
    const fcmTopic = Constants.expoConfig?.extra?.fcmTopic;

    // 3) 토큰 발급 시도
    try {
      console.log('🔍 [Debug] attempting getExpoPushTokenAsync...');
      const tokenData = await Notifications.getExpoPushTokenAsync({
           projectId: Constants.expoConfig?.extra?.eas?.projectId,
      });

      console.log('✅ Expo Push Token:', tokenData.data);



      console.log('📤 Sending to backend:', {
        fcmToken: tokenData.data,
        userId: 1
      });

      try {
          await axios.post(`${backendUrl}/register-token`, {
            fcmToken: tokenData.data,
            userId: "1"
          });
          console.log('✅ Token successfully registered to backend');
        } catch (err) {
          console.error('❌ Failed to register token to backend:', err);
        }

      return tokenData.data;
    } catch (error) {
      console.error('❌ Error getting Expo Push Token:', error);
      return null;
    }
  }

  return { expoPushToken, permissionStatus }
}