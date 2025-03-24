import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Colors } from "@/constants/Colors";
import { signOutUser } from "@/hooks/authService";

export default function Profile() {
  const email = useSelector((state: RootState) => state.auth.user?.email);
  const [loading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    setIsLoading(true);
    await signOutUser(dispatch);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome,</Text>
      <View style={styles.logOutBox}>
        <Text style={styles.email}>{email}</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.btn}>
          {loading ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <Text style={styles.logText}>Log Out</Text>
          )}
        </TouchableOpacity>
        <Text>TBC</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontFamily: "bold",
    fontSize: 20,
  },
  logOutBox: {
    // gap: 10,
    // marginTop: 5,
    alignItems: "center",
  },
  email: {
    fontFamily: "regular",
    fontSize: 15,
  },
  btn: {
    width: 200,
    height: 50,
    backgroundColor: Colors.pink,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  logText: {
    fontFamily: "medium",
    color: "white",
  },
});
