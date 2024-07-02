import Loading from "@/components/Loading";
import ProductCategory from "@/components/ProductCategory";
import ProductDeleteModel from "@/components/models/ProductDeleteModel";
import Colors from "@/constants/Colors";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import useDeleteAscyncStorage from "@/hooks/asyncStorage/useDeleteAsyncStorage";
import useDeleteAscyncStorageProducts from "@/hooks/asyncStorage/useDeleteAsyncStorageProducts";
import useReadAscyncStorage from "@/hooks/asyncStorage/useReadAscyncStorage";
import useWriteAscyncStorage from "@/hooks/asyncStorage/useWriteAscyncStorage";
import useUniqueId from "@/hooks/useGenerateId";
import { ProductData } from "@/interfaces/productsData";
import { StockData } from "@/interfaces/stockData";
import useNavigationStore from "@/zustand/navigationStore";
import { Entypo } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useToast } from "react-native-toast-notifications";

const ProductCategories = () => {
  const isThisPage = useIsFocused();
  const setPage = useNavigationStore((state) => state.setPage);

  useEffect(() => {
    if (isThisPage) {
      setPage("productsList");
      fetchData();
    }
  }, [isThisPage]);

  const generateUniqueId = useUniqueId("PRODUCT");
  const storeDataAsyncStorage = useWriteAscyncStorage();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const productId = generateUniqueId();
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");

  const readDataAsyncStorage = useReadAscyncStorage();

  const fetchData = async () => {
    const data = await readDataAsyncStorage(STORAGE_KEYS.products);
    setProducts(data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addProductCategory = async () => {
    setLoading(true);
    if (productName.trim() === "") {
      setLoading(false);
      return toast.show(
        "You can't add empty product. Type the name before add.",
        {
          type: "warning",
        }
      );
    }
    const productData = { productId, productName };

    const result = await storeDataAsyncStorage(
      productData,
      STORAGE_KEYS.products
    );

    if (result.status === "success") {
      toast.show("Product added successfully.", { type: "success" });
      setProductName("");
      await fetchData();
    } else {
      toast.show("Failed to add product. Something went wrong.", {
        type: "danger",
      });
    }
    setLoading(false);
  };

  const deleteDataAsyncStorage = useDeleteAscyncStorage();
  const deleteDataAsyncStorageProducts = useDeleteAscyncStorageProducts();

  const deleteProduct = async (id: string) => {
    setLoading(true);
    const items = await readDataAsyncStorage(STORAGE_KEYS.stocks);

    const check = items.filter((item: StockData) => item.itemType === id);
    if (check.length > 0) {
      for (let i = 0; i < check.length; i++) {
        const result = await deleteDataAsyncStorage(
          check[i].itemId,
          STORAGE_KEYS.stocks
        );
        if (result.status === "failed") {
          setLoading(false);
          setModalVisible(false);
          return toast.show("Failed to delete product. Something went wrong.", {
            type: "danger",
          });
        }
      }
    }

    const result = await deleteDataAsyncStorageProducts(
      id,
      STORAGE_KEYS.products
    );
    if (result.status === "success") {
      toast.show("Product deleted successfully.", { type: "success" });
      await fetchData();
    } else {
      toast.show("Failed to delete product. Something went wrong.", {
        type: "danger",
      });
    }
    await fetchData();
    setLoading(false);
    setModalVisible(false);
  };

  return (
    <>
      {loading && <Loading message="Loading Products" />}
      <ProductDeleteModel
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        handleDelete={() => deleteProduct(deleteItemId)}
      />

      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.title}>Product Categories</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Product Category Name</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter item name here..."
              placeholderTextColor={Colors.border}
              onChangeText={setProductName}
              value={productName}
            />
            <TouchableOpacity
              style={styles.addBtn}
              onPress={addProductCategory}
            >
              <Entypo name="plus" size={28} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={products}
          keyExtractor={(item) => item.productId}
          style={{ marginTop: 20 }}
          renderItem={({ item }) => (
            <ProductCategory
              data={item}
              setModalVisible={setModalVisible}
              setDeleteItemId={setDeleteItemId}
            />
          )}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </KeyboardAvoidingView>
    </>
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
