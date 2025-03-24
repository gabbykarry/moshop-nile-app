import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { AppDispatch } from "../store/store";
import { login, logout, setToken } from "../store/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Store authentication token securely
const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('auth-token', token);
  } catch (error) {
    console.error('Failed to store auth token:', error);
  }
};

// Remove authentication token
const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('auth-token');
  } catch (error) {
    console.error('Failed to remove auth token:', error);
  }
};

// Sign up function
export const signUpUser = async (
  email: string,
  password: string,
  dispatch: AppDispatch
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User signed up:", user);

    dispatch(login({ uid: user.uid, email: user.email! }));
    const token = await user.getIdToken();
    dispatch(setToken(token));
    await storeToken(token);

    return;
  } catch (error) {
    const err = error as FirebaseError;
    console.error("Signup error:", err.message);
    return err.message;
  }
};

// Sign in function
export const signInUser = async (
  email: string,
  password: string,
  dispatch: AppDispatch
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    dispatch(login({ uid: user.uid, email: user.email! }));
    const token = await user.getIdToken();
    dispatch(setToken(token));
    await storeToken(token);

    return;
  } catch (error) {
    const err = error as FirebaseError;
    console.error("Sign-in error:", err.message);
    return err.message;
  }
};

// Sign out function
export const signOutUser = async (dispatch: AppDispatch) => {
  try {
    await signOut(auth);
    dispatch(logout());
    await removeToken();
    return;
  } catch (error) {
    const err = error as FirebaseError;
    console.error("Sign-out error:", err.message);
    return err.message;
  }
};

// Set up auth state listener to keep Redux in sync with Firebase
export const setupAuthListener = (dispatch: AppDispatch) => {
  return onAuthStateChanged(auth, async (user) => {
    console.log("Auth state changed:", user);
    if (user) {
      try {
        const token = await user.getIdToken();
        dispatch(login({ uid: user.uid, email: user.email || '' }));
        dispatch(setToken(token));
        await storeToken(token);
      } catch (error) {
        console.error('Failed to process auth state change:', error);
      }
    } else {
      dispatch(logout());
      await removeToken();
    }
  });
};
