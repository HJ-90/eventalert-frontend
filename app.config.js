// frontend/app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: "EventAlert",
    slug: "my-admin-app",
    owner: 'khj90',
    scheme: process.env.EXPO_SCHEME,
    extra: {
        eas: {
        projectId: "9971e6ae-d9e1-415d-b77c-703b3360b072",
      },
      fcmTopic: process.env.FCM_TOPIC,
      backendUrl: process.env.BACKEND_URL,
      firebaseProjectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    },
    android: {
      package: "com.khj90.eventalert",
      googleServicesFile: "./google-services.json"
    },
    plugins: [
      '@react-native-firebase/app',
      '@react-native-firebase/messaging',
      "expo-dev-client",
      [
        "expo-build-properties",
        { android: { googleServicesFile: "./google-services.json" } }
      ]
    ]
  }
};

