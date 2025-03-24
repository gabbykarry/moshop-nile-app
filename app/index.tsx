import { StyleSheet, Text, View, Image, Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";
import { useRouter } from "expo-router";

export default function Index() {
  // Animation value for the logo scale
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  const router = useRouter();

  useEffect(() => {
    // Create a zoom in animation for the logo
    Animated.sequence([
      // First zoom in bigger than normal
      Animated.timing(logoScale, {
        toValue: 1.3,
        duration: 500,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      // Then settle back to normal size
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    // Fade in the text after the logo animation
    Animated.timing(textOpacity, {
      toValue: 1,
      duration: 400,
      delay: 600, // Start after logo animation
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      router.replace("/signIn");
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Animated.View style={{ transform: [{ scale: logoScale }] }}>
          <Image
            source={require("../assets/images/logo-nile.png")}
            style={styles.logo}
          />
        </Animated.View>
        <Animated.Text style={[styles.title, { opacity: textOpacity }]}>
          Mushop
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontFamily: "bold",
    fontSize: 30,
  },
});
