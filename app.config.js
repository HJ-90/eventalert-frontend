// frontend/app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: "EventAlert",
    slug: "eventalert",
    scheme: process.env.EXPO_SCHEME,
    extra: {
      fcmTopic: process.env.FCM_TOPIC,
      backendUrl: process.env.BACKEND_URL,
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
    ],
  }
};

