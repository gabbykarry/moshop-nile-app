import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Colors } from "@/constants/Colors";
import CartItemCard from "@/components/CartItemCard";
import { ChevronsRight, ShoppingCart } from "lucide-react-native";
import { cartTotal } from "@/store/cartSlice";
import { useNavigation, useRouter } from "expo-router";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { showToast } from "@/store/toastSlice";

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const totalAmount = useSelector(cartTotal);

  const router = useRouter();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Hides tab bar
  useEffect(() => {
    navigation.setOptions({ tabBarStyle: { display: "none" } });

    return () => {
      navigation.setOptions({ tabBarStyle: undefined });
    };
  }, [navigation]);

  const handleCheckout = () => {
    if (cart.length < 1) return;
    dispatch(
      showToast({
        message: "Senior Man calm",
        type: "WIP 🚧",
      })
    );
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Cart</Text>
          <View style={styles.lengthView}>
            <Text style={styles.lengthText}>{cart.length}</Text>
          </View>
        </View>

        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          // numColumns={2}
          // columnWrapperStyle={{
          //   marginTop: 20,
          //   justifyContent: "space-between",
          // }}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item }) => <CartItemCard item={item} />}
        />

        <TouchableOpacity
          hitSlop={30}
          style={styles.moreView}
          onPress={() => router.replace("/(tabs)/Home")}
        >
          <ShoppingCart size={18} color={"black"} />
          <Text style={styles.more}>
            Add {cart.length < 1 ? "a product to cart" : "more"}
          </Text>
        </TouchableOpacity>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryHeader}>Order Summary</Text>
          <View
            style={{
              borderBottomColor: "white",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View style={styles.rowView}>
            <Text style={styles.rowText}>Subtotal</Text>
            <Text
              style={[
                styles.rowText,
                {
                  textAlign: "right",
                },
              ]}
            >
              {"USD "}
              {totalAmount.toFixed(2)}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.rowText}>Shipping Fees</Text>
            <Text
              style={[
                styles.rowText,
                ,
                {
                  textAlign: "right",
                },
              ]}
            >
              USD 0.00
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.rowText}>Total</Text>
            <Text
              style={[
                styles.rowText,
                {
                  textAlign: "right",
                },
              ]}
            >
              {"USD "}
              {totalAmount.toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        disabled={cart.length < 1}
        style={styles.checkoutButton}
        onPress={handleCheckout}
      >
        <View style={styles.textView}>
          <Text style={styles.checkoutText}>Checkout</Text>
          <ChevronsRight size={18} color={"white"} />
        </View>
      </TouchableOpacity>
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
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerText: {
    fontFamily: "semibold",
    fontSize: 27,
  },
  lengthView: {
    width: 40,
    height: 40,
    backgroundColor: Colors.lemon,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  lengthText: {
    color: "white",
    fontFamily: "bold",
    fontSize: 20,
  },
  moreView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 15,
  },
  more: {
    fontFamily: "medium",
    fontSize: 18,
  },
  summaryBox: {
    backgroundColor: Colors.black,
    borderRadius: 30,
    gap: 8,
    padding: 18,
    marginTop: 20,
  },
  summaryHeader: {
    color: "white",
    fontFamily: "semibold",
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowText: {
    color: "white",
    fontFamily: "regular",
  },
  // btnView:{
  //   paddingHorizontal: 15,
  //   paddingVertical: 23,
  //   backgroundColor: "rgba(255, 255, 255, 0.1)"
  // },
  checkoutButton: {
    position: "absolute",
    bottom: 22,
    left: 20,
    right: 20,
    backgroundColor: "black",
    padding: 20,
    borderRadius: 50,
    alignItems: "center",
  },
  textView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  checkoutText: {
    color: "white",
    flex: 1,
    textAlign: "center",
    fontFamily: "medium",
    fontSize: 20,
  },
});
