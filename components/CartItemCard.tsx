import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Product } from "@/store/productsSlice";
import { getRandomColor, shortenProductName } from "@/constants/utils";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { addToCart, decreaseQuantity } from "@/store/cartSlice";
import { Feather } from "@expo/vector-icons";

export default function CartItemCard({ item }: { item: Product }) {
  const dispatch = useDispatch();
  const bgColor = getRandomColor(item.title);

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <LinearGradient
        colors={[
          "white",
          "white",
          "rgba(255,255,255,0.8)",
          "rgba(255,255,255,0.4)",
          bgColor,
        ]}
        locations={[0, 0.3, 0.5, 0.7, 1]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradient}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.infoBox}>
          <Text style={styles.title}>{shortenProductName(item.title)}</Text>
          <Text style={styles.price}>USD {item.price}</Text>
        </View>
        <View style={styles.quantityBox}>
          <TouchableOpacity onPress={() => dispatch(decreaseQuantity(item.id))}>
            {/* <Text style={styles.button}>−</Text> */}
            <Feather name="minus" size={18} color="white" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            hitSlop={20}
            onPress={() => dispatch(addToCart({ ...item, quantity: 1 }))}
          >
            {/* <Text style={styles.button}>+</Text> */}
            <Feather name="plus" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    // overflow: "hidden"
  },
  gradient: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 25,
  },
  infoBox: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 15,
    fontFamily: "medium",
  },
  price: {
    fontSize: 18,
    fontFamily: "semibold",
  },
  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
  },
  button: {
    fontSize: 18,
    color: "#fff",
    paddingHorizontal: 10,
  },
  quantity: {
    fontSize: 16,
    color: "#fff",
    marginHorizontal: 10,
  },
});
