import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
// import { Product } from "@/app/(tabs)/Home";
import { getRandomColor, shortenProductName } from "@/constants/utils";
import { RelativePathString, useRouter } from "expo-router";
import { Product } from "@/store/productsSlice";

export default function ProductCard({ item }: { item: Product }) {

  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: `/details/[${item.id.toString()}]` as RelativePathString,
      params: { 
        id: item.id.toString(),
        title: item.title,
        price: item.price.toString(),
        image: item.image,
        description: item.description,
        category: item.category,
        quantity: item.quantity
      }
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image
        source={{ uri: item.image }}
        style={{ width: 100, height: 100, borderRadius: 10, resizeMode: "contain",   alignSelf: "center" }}
      />
      <View style={styles.itemInfo}>
        <Text style={styles.name}>{shortenProductName(item.title)}</Text>
        <Text style={styles.price}>USD{" "}{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    paddingHorizontal: 15,
    // backgroundColor: "white"
    gap: 10,
  },
  itemInfo:{
    gap: 5
  },
  name:{
    fontFamily: "regular",
    fontSize: 15
  },
  price:{
    fontFamily: "medium",
    fontSize: 15
  }
});
