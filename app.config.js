// frontend/app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: "EventAlert",
    slug: "eventalert",
    scheme: process.env.EXPO_SCHEME,
    extra: {
        eas: {
        projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID,
      },
      fcmTopic: process.env.FCM_TOPIC,
      backendUrl: process.env.BACKEND_URL,
      firebaseProjectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    },
    android: {
      package: "com.khj90.eventalert"
    },
    plugins: [
      "expo-dev-client",
      [
        "expo-build-properties",
        { android: { googleServicesFile: "./google-services.json" } }
      ]
    ]
  }
};

