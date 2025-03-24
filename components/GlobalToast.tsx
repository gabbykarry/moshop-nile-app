import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { hideToast } from "@/store/toastSlice";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";

const GlobalToast = () => {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state: RootState) => state.toast);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (message) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => dispatch(hideToast()));
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [message, dispatch, fadeAnim]);

  if (!message) return null;

  const iconName =
    type === "success" || "WIP 🚧" ? "check" : type === "error" ? "x" : "info";

  return (
    <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
      <View style={styles.infoBox}>
        <View style={[styles[type === "WIP 🚧" ? "info" : type || "info"], styles.iconView]}>
          <Feather name={iconName} size={15} color="white" />
        </View>

        <View>
          <Text style={styles.typeText}>{type?.toUpperCase()}</Text>
          <Text style={styles.toastText}>{message}</Text>
        </View>
      </View>

      <TouchableWithoutFeedback onPress={() => dispatch(hideToast())}>
      <Feather name={"x"} size={15} color="white" />
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "black",
    borderWidth: 2.5,
    borderColor: "rgba(30, 30, 30, 0.8)",
  },
  toastText: {
    color: "rgba(172, 181, 187, 0.8)",
    fontSize: 15,
    flex: 1,
    fontFamily: "regular",
  },
  typeText:{
    fontFamily: "semibold",
    fontSize: 15,
    color: "#fff",
  },
  closeText: {
    color: "#fff",
    fontSize: 18,
    paddingHorizontal: 8,
  },
  success: { backgroundColor: "#4CAF50" },
  error: { backgroundColor: "#F44336" },
  info: { backgroundColor: "#FFD54F" },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15
  },
  iconView: {
    borderRadius: 100,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GlobalToast;
