import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { signInUser } from "@/hooks/authService";
import { useRouter } from "expo-router";
import { showToast } from "@/store/toastSlice";
import { errorFilter } from "@/constants/utils";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  // Validate email format
  const validateEmail = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (text.trim().length === 0) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(text)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  // Validate password strength
  const validatePassword = (text: string) => {
    setPassword(text);
    if (text.trim().length === 0) {
      setPasswordError("Password is required");
    } else if (text.trim().length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else if (!/\d/.test(text) || !/[a-zA-Z]/.test(text)) {
      setPasswordError("Password must contain both letters and numbers");
    } else {
      setPasswordError("");
    }
  };

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  // Sign in function
  const handleSignIn = async () => {
    try {
      setLoading(true);

      const error = await signInUser(email, password, dispatch);
      if (error) {
        dispatch(showToast({ message: errorFilter(error), type: "error" }));
        return;
      }

      dispatch(
        showToast({ message: "User registered successfully", type: "success" })
      );
    } catch (err) {
      dispatch(
        showToast({
          message: "Something went wrong. Please try again.",
          type: "error",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Sign in to your{"\n"}Account</Text>
        <Text style={styles.descText}>
          Enter your email and password to log in.
        </Text>
      </View>

      {/* inputs */}
      <View style={styles.inputs}>
        {/* Email input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View
            style={[styles.inputWrapper, emailError ? styles.inputError : null]}
          >
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              keyboardType="email-address"
              value={email}
              onChangeText={validateEmail}
            />
          </View>
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
        </View>

        {/* Password input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View
            style={[
              styles.inputWrapper,
              passwordError ? styles.inputError : null,
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry={!hidePassword}
              value={password}
              onChangeText={validatePassword}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.iconContainer}
            >
              <Ionicons
                name={hidePassword ? "eye-outline" : "eye-off-outline"}
                size={15}
                color={"#ACB5BB"}
              />
            </TouchableOpacity>
          </View>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>
      </View>

      <TouchableOpacity
        disabled={!(password && email)}
        onPress={handleSignIn}
        style={styles.buttonView}
      >
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0)"]}
          style={styles.button}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.btnText}>Log in</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.optionsView}>
        <Text style={styles.descText}>Don’t have an account?</Text>
        <TouchableOpacity hitSlop={20} onPress={() => router.push("/signUp")}>
          <Text
            style={[
              styles.descText,
              { color: Colors.pink, fontFamily: "semibold" },
            ]}
          >
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  headerContainer: {
    marginTop: 100,
    gap: 10,
  },
  headerText: {
    fontSize: 30,
    fontFamily: "bold",
  },
  descText: {
    fontSize: 15,
    fontFamily: "medium",
    color: Colors.gray,
  },
  inputContainer: {
    gap: 5,
  },
  inputs: {
    marginTop: 40,
    gap: 20,
  },
  label: {
    fontSize: 15,
    fontFamily: "medium",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    fontFamily: "regular",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    fontFamily: "regular",
    marginTop: 5,
  },
  iconContainer: {
    padding: 10,
  },
  button: {
    backgroundColor: Colors.btn,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 80,
  },
  btnText: {
    fontFamily: "medium",
    fontSize: 15,
    color: "white",
  },
  buttonView: {
    justifyContent: "flex-end",
    marginBottom: 50,
  },
  optionsView: {
    flexDirection: "row",
    justifyContent: "center",
    // marginTop: 20,
    gap: 5,
  },
});
