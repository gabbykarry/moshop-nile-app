import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SearchIcon } from "lucide-react-native";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { Product } from "@/store/productsSlice";

export default function Search() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, categories, loading } = useSelector(
    (state: RootState) => state.products
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetchProducts();

    if (products) {
      setFilteredProducts(products);
    }
  }, []);

  // const fetchProducts = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get("https://fakestoreapi.com/products");
  //     setProducts(response.data);
  //     setFilteredProducts(response.data);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Text style={styles.headerText}>Search</Text>

      {/* Search Input */}
      <View style={styles.searchBar}>
        <View style={styles.iconView}>
          <SearchIcon size={20} color={"black"} />
        </View>
        <TextInput
          placeholder="Search items"
          placeholderTextColor={"white"}
          style={styles.input}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Loading State */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="black" />
        </View>
      ) : (
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
          contentContainerStyle={{ flexGrow: 1, marginTop: 180 }}
          renderItem={({ item }) => <ProductCard item={item} />}
        />
      )}
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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    gap: 10,
    backgroundColor: "#223336",
    borderRadius: 50,
    marginTop: 30,
    marginBottom: 15,
  },
  iconView: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  input: {
    fontFamily: "medium",
    fontSize: 15,
    flex: 1,
    color: "white",
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  // noResults: {
  //   textAlign: "center",
  //   marginTop: 20,
  //   fontSize: 16,
  //   fontFamily: "medium",
  //   color: "gray",
  // },
});
