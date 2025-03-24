import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { Ionicons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { cartTotal } from "@/store/cartSlice";
import { RootState } from "@/store/store";
import { Colors } from "@/constants/Colors";
import { getRandomColor } from "@/constants/utils";

export default function _layout() {
  const badgeNumber = useSelector((state: RootState) => state.cart.cart).length;
  const color = getRandomColor("badgeNumber");
  return (
    <Tabs
      screenOptions={{
        tabBarButton: (props) => (
          <TouchableOpacity
            {...(props as TouchableOpacityProps)}
            activeOpacity={0.7}
            style={props.style}
          />
        ),
        tabBarLabel: () => null, // Remove text labels
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          // <View style={styles.blurView} />
          //           <LinearGradient
          //   style={styles.blurView}
          //   colors={["rgba(12, 20, 21, 0.1)", "rgba(12, 20, 21, 0.1)"]}
          //   // start={{x: 0, y: 0}}
          //   // end={{x: 1, y: 0}}
          // />
          <BlurView
            intensity={15}
            tint="dark"
            style={{
              position: "absolute",
              bottom: 20,
              left: 20,
              right: 20,
              height: 65,
              borderRadius: 30,
              overflow: "hidden",
              backgroundColor: "rgba(25, 25, 30, 0.7)",
            }}
          />
        ),
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeTab]}>
              <Feather name="home" size={20} color={focused ? "black" : "white"} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeTab]}>
              {/* <Feather name="search" size={20} color={focused ? "black" : "white"} /> */}
              <Feather
                name="search"
                size={20}
                color={focused ? "black" : "white"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Cart"
        options={{
          // tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeTab]}>
              <Feather
                name="shopping-cart"
                size={20}
                color={focused ? "black" : "white"}
              />
              {badgeNumber >= 1 && (
                <View style={[styles.badge, { backgroundColor: color }]}>
                  <Text style={styles.badgeText}>{badgeNumber}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeTab]}>
              <Feather name="user" size={20} color={focused ? "black" : "white"} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    marginHorizontal: 50,
    height: 70,
    borderRadius: 30,
    paddingHorizontal: 30,
    elevation: 0,
    borderTopWidth: 0,
    backgroundColor: "transparent",
  },
  blurView: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    height: 65,
    borderRadius: 30,
    overflow: "hidden",
    // backgroundColor: "rgba(12, 20, 21, 0.4)"
    // backgroundColor: "rgba(45, 45, 50, 0.55)",
    backgroundColor: "rgba(35, 35, 40, 0.5)",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  activeTab: {
    backgroundColor: "white",
  },
  badge: {
    position: "absolute",
    right: 2,
    top: 5,
    backgroundColor: Colors.pink,
    borderRadius: 10,
    minWidth: 15,
    height: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontFamily: "semibold",
    textAlign: "center",
  },
});
