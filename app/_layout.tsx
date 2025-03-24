import {StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { Slot, useRouter, useSegments } from "expo-router";
import { Provider, useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store, { AppDispatch, RootState } from "@/store/store";
import GlobalToast from "@/components/GlobalToast";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {setToken } from "@/store/authSlice";
import { setupAuthListener } from "@/hooks/authService";
import { fetchProducts } from "@/store/productsSlice";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.container}>
        <MainContent />
        <GlobalToast /> 
      </GestureHandlerRootView>
      <StatusBar style="dark" />
    </Provider>
  );
}

function MainContent() {
  const [appReady, setAppReady] = useState(false);
  const [loaded] = useFonts({
    regular: require("../assets/fonts/Montserrat-Regular.ttf"),
    medium: require("../assets/fonts/Montserrat-Medium.ttf"),
    semibold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    bold: require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const segments = useSegments(); // Get current route segments

  // Initialize app - load auth state and assets
  useEffect(() => {
    async function prepare() {
      try {

        dispatch(fetchProducts());
        // Restore authentication token
        const token = await AsyncStorage.getItem('auth-token');
        if (token) {
          dispatch(setToken(token));
        }
        
        // Redux in sync with Firebase
        const unsubscribe = setupAuthListener(dispatch);
        return unsubscribe; // Clean up 
      } catch (e) {
        console.warn('Failed to load auth token:', e);
      } finally {
        setAppReady(true);
      }
    }

    prepare();
  }, [dispatch]);

 // Handle splash screen
 useEffect(() => {
  if (appReady && loaded) {
    SplashScreen.hideAsync();
  }
}, [appReady, loaded]);

// Handle navigation based on auth state
useEffect(() => {
  if (!appReady || !loaded) return;

  const inProtectedRoute = segments[0] === '(tabs)';
  const inAuthRoute = segments[0] === 'signIn' || segments[0] === 'signUp';
  
  // Handle navigation redirection
  if (isAuthenticated && inAuthRoute) {
    router.replace('/(tabs)/Home');
  } else if (!isAuthenticated && inProtectedRoute) {
    router.replace('/signIn');
  }
}, [isAuthenticated, appReady, loaded, segments, router]);


if (!appReady || !loaded) {
  return null;
}

  return <Slot />;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
