import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Colors } from "@/constants/Colors";
import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/store/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, categories, loading } = useSelector(
    (state: RootState) => state.products
  );
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [refreshing, setRefreshing] = React.useState(false);

  const router = useRouter();

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchProducts());
    setRefreshing(false);
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="black" />
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.container}
    >
      <Text style={styles.headerText}>Discover Unique{"\n"}Items</Text>

      {/* scrollable categories */}
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.categoryContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* Categories */}
        {categories.slice(0, 10).map((category) => (
          <TouchableOpacity
            style={styles.categoryButton}
            key={category}
            onPress={() => setSelectedCategory(category)}
          >
            <View style={styles.categoryView}>
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategory,
                ]}
              >
                {category}
              </Text>
              <View style={selectedCategory === category && styles.dot}></View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products */}
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.productsContainer}
        showsHorizontalScrollIndicator={false}
      >
        <FlatList
          data={filteredProducts.slice(0, 5)}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          renderItem={({ item }) => <ProductCard item={item} />}
          horizontal={true}
        />
      </ScrollView>

      <View style={styles.section}>
        <View style={styles.sectionHeading}>
          <Text style={styles.sectionHeader}>Best Offers</Text>
          <TouchableOpacity
            onPress={() => router.replace("/(tabs)/Search")}
            style={styles.allbtn}
          >
            <Text style={styles.allText}>View all</Text>
            <Feather name="chevron-right" size={12} color={"black"} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          numColumns={2}
          columnWrapperStyle={{
            marginTop: 20,
            justifyContent: "space-between",
          }}
          inverted
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item }) => <ProductCard item={item} />}
          //   numColumns={2}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: "white",
  },
  headerText: {
    fontFamily: "semibold",
    fontSize: 27,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryContainer: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
    marginTop: 30,
  },
  categoryText: {
    fontFamily: "semibold",
    fontSize: 15,
    color: Colors.gray,
  },
  selectedCategory: {
    color: Colors.black,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 100,
    backgroundColor: Colors.black,
  },
  categoryView: {
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 3,
  },
  categoryButton: {
    padding: 5,
  },
  productsContainer: {
    marginTop: 20,
    gap: 20,
  },
  section: {
    marginTop: 40,
    marginBottom: 170,
  },
  sectionHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  allbtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  sectionHeader: {
    fontFamily: "semibold",
    fontSize: 20,
  },
  allText: {
    fontFamily: "medium",
    fontSize: 14,
    color: Colors.pink,
  },
});
