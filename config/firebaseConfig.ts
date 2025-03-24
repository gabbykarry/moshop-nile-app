import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  // @ts-ignore
  getReactNativePersistence,
} from "firebase/auth";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration object (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBhuPx-EZwTsguTnEGXuGkSzGy9GcOWwl0",
  authDomain: "nile-app-e98a8.firebaseapp.com",
  projectId: "nile-app-e98a8",
  storageBucket: "nile-app-e98a8.firebasestorage.app",
  messagingSenderId: "1025056029039",
  appId: "1:1025056029039:web:56331e780c0d79e335509a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Export auth instance
export { auth };
