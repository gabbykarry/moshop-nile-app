import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  browserSessionPersistence,
  // @ts-ignore
  getReactNativePersistence
} from "firebase/auth";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";


// Firebase configuration object (from Firebase Console)
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
};

console.log("API KEY:", process.env.EXPO_PUBLIC_API_KEY);


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const persistence = Platform.OS === 'web'
//            ? browserSessionPersistence
//            : getReactNativePersistence(ReactNativeAsyncStorage);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Export auth instance
export { auth };
