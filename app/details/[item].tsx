import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MoveLeft, Minus, Plus } from "lucide-react-native";
import { Colors } from "@/constants/Colors";
import { formatTextWithLineBreaks } from "@/constants/utils";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { showToast } from "@/store/toastSlice";
import { Product } from "@/store/productsSlice";

export default function ProductDetails() {
  const params = useLocalSearchParams();
  const { id, title, price, image, description, category } = params;
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const existingCartItem = cartItems.find((item) => item.id === Number(id));

  const [quantity, setQuantity] = useState(existingCartItem?.quantity || 1);

  // const initialQuantity = quantity ? Number(quantity) : 1;

  useEffect(() => {
    if (existingCartItem) {
      setQuantity(existingCartItem.quantity || 1);
    }
  }, [existingCartItem]);

  const id2 = Number(id);
  const title2 = String(params.title);
  const price2 = Number(params.price);
  const description2 = String(params.description);
  const category2 = String(params.category);
  const image2 = String(params.image);

  const itemProps: Product = {
    id: id2,
    title: title2,
    price: price2,
    description: description2,
    category: category2,
    image: image2,
    quantity: quantity,
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    dispatch(addToCart(itemProps));
    dispatch(showToast({ message: "Item added to cart", type: "success" }));
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.container}
      >
        <TouchableOpacity style={styles.backbtn} onPress={() => router.back()}>
          <MoveLeft size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.title}>
            {formatTextWithLineBreaks(title as string)}
          </Text>
          <Text style={styles.price}>USD {price}</Text>
        </View>

        <Image source={{ uri: image as string }} style={styles.image} />

        <View style={styles.descView}>
          <View style={styles.badgesView}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Official Store</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: "#F1EDFC" }]}>
              <Text style={styles.badgeText}>{category}</Text>
            </View>
          </View>

          <View style={styles.descBox}>
            <Text style={styles.descHeader}>Product Details</Text>
            <Text style={styles.desc}>{description}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Amount Selector & Add to Cart */}
      <View style={styles.amountContainer}>
        <View style={styles.amountBox}>
          <TouchableOpacity
            style={styles.amountButton}
            onPress={decreaseQuantity}
          >
            <Minus size={18} color="black" />
          </TouchableOpacity>

          <Text style={styles.amountText}>{quantity}</Text>

          <TouchableOpacity
            style={styles.amountButton}
            onPress={increaseQuantity}
          >
            <Plus size={18} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: "white",
  },
  backbtn: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  infoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 30,
  },
  title: {
    fontFamily: "medium",
    fontSize: 18,
    flex: 1,
  },
  price: {
    fontFamily: "bold",
    fontSize: 25,
  },
  image: {
    width: "95%",
    height: 450,
    borderRadius: 10,
    resizeMode: "contain",
    alignSelf: "center",
  },
  descView: {
    marginVertical: 35,
  },
  badgesView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  badge: {
    backgroundColor: "#E4F3EA",
    padding: 5,
    borderRadius: 5,
  },
  badgeText: {
    fontFamily: "medium",
    fontSize: 12,
  },
  desc: {
    fontFamily: "regular",
    fontSize: 14,
  },
  descHeader: {
    fontFamily: "medium",
    fontSize: 16,
  },
  descBox: {
    marginTop: 15,
    gap: 10,
    marginBottom: 30,
  },

  amountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 23,
  },
  amountBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 8,
    gap: 15,
  },
  amountButton: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  amountText: {
    fontFamily: "bold",
    fontSize: 18,
  },

  addToCartButton: {
    backgroundColor: Colors.black,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
  },
  addToCartText: {
    color: "white",
    fontFamily: "semibold",
    fontSize: 16,
    textAlign: "center",
  },
});
