import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import useNavigationStore from "@/zustand/navigationStore";
import { useIsFocused } from "@react-navigation/native";
import Colors from "@/constants/Colors";
import { Entypo } from "@expo/vector-icons";
import StockItem from "@/components/StockItem";
import ProductCategory from "@/components/ProductCategory";

import cotegoryData from "@/data/parts.json";

const ProductCategories = () => {
  const isThisPage = useIsFocused();
  const setPage = useNavigationStore((state) => state.setPage);

  useEffect(() => {
    isThisPage && setPage("productsList");
  }, [isThisPage]);

  const [productName, setProductName] = useState("");
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>Product Categories</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Product Category Name</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter item name here..."
            placeholderTextColor={Colors.border}
            onChangeText={(text) => setProductName(text)}
            value={productName}
          />
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => console.log("Add Product Category")}
          >
            <Entypo name="plus" size={28} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={cotegoryData}
        keyExtractor={(item) => item.productId}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => <ProductCategory data={item} />}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 20,
    backgroundColor: Colors.background,
  },
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: "700",
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 10,
  },
  inputLabel: {
    color: Colors.white,
    fontSize: 17,
    marginBottom: 5,
    fontWeight: "700",
    marginTop: 20,
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  textInput: {
    padding: 10,
    backgroundColor: Colors.componentBg,

    color: Colors.white,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.componentBorder,
    width: "80%",
  },
  addBtn: {
    backgroundColor: Colors.buttonBg,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "18%",
    height: 52,
    borderColor: Colors.componentBorder,
    borderWidth: StyleSheet.hairlineWidth,
    elevation: 5,
  },
});

export default ProductCategories;
