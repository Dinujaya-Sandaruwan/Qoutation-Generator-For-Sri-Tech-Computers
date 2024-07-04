import Colors from "@/constants/Colors";
import useNavigationStore from "@/zustand/navigationStore";
import { AntDesign } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import StockItem from "@/components/StockItem";
import StockDeleteModel from "@/components/models/StockDeleteModel";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import useDeleteAscyncStorage from "@/hooks/asyncStorage/useDeleteAsyncStorage";
import useReadAscyncStorage from "@/hooks/asyncStorage/useReadAscyncStorage";
import { ProductData } from "@/interfaces/productsData";
import { StockData } from "@/interfaces/stockData";
import { useToast } from "react-native-toast-notifications";

type Item = {
  label: string;
  value: string;
};

const StockList = () => {
  const isThisPage = useIsFocused();
  const setPage = useNavigationStore((state) => state.setPage);

  useEffect(() => {
    isThisPage && setPage("stockList");
  }, [isThisPage]);

  const toast = useToast();

  const [value, setValue] = useState<ProductData | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  const [stockItemList, setStockItemList] = useState([] as StockData[]);
  const readDataAsyncStorage = useReadAscyncStorage();
  const [deleteItemId, setDeleteItemId] = useState("");

  useEffect(() => {
    const getData = async () => {
      const data = await readDataAsyncStorage(STORAGE_KEYS.stocks);
      const filteredData = data?.filter(
        (item: StockData) => item?.itemType === value?.productId
      );
      setStockItemList(filteredData?.reverse() || []);
    };
    getData();
  }, [value, deleteItemId]);

  const [isModalVisible, setModalVisible] = useState(false);

  const deleteDataAsyncStorage = useDeleteAscyncStorage();

  const handleDelete = async () => {
    const data = await deleteDataAsyncStorage(
      deleteItemId,
      STORAGE_KEYS.stocks
    );

    if (data.status === "success") {
      toast.show("Item added successfully", {
        type: "success",
        placement: "bottom",
        duration: 4000,
        animationType: "slide-in",
      });
      setModalVisible(false);
      setDeleteItemId("");
    } else {
      toast.show("Something went wrong", {
        type: "danger",
        placement: "bottom",
        duration: 4000,
        animationType: "slide-in",
      });
    }
  };

  const [products, setProducts] = useState<ProductData[]>([]);

  const fetchData = async () => {
    const data = await readDataAsyncStorage(STORAGE_KEYS.products);
    setProducts(data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = (
    item: {
      productId: string;
      productName: string;
    },
    selected: boolean
  ) => (
    <View
      style={[styles.itemContainer, selected && styles.selectedItemContainer]}
    >
      <Text style={[styles.itemText, selected && styles.selectedItemText]}>
        {item.productName}
      </Text>
    </View>
  );

  return (
    <>
      <StockDeleteModel
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        handleDelete={handleDelete}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Edit Stock Item List</Text>
        <Text style={styles.dropdownTitle}>Select the item category</Text>
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          containerStyle={styles.dropdownContainer}
          itemTextStyle={styles.itemTextStyle}
          itemContainerStyle={styles.itemContainerStyle}
          data={products}
          search
          maxHeight={300}
          labelField="productName"
          valueField="productId"
          placeholder={!isFocus ? "Select item" : "..."}
          searchPlaceholder="Search..."
          value={value}
          dropdownPosition="bottom"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item: ProductData) => {
            setValue(item);
            setIsFocus(false);
          }}
          renderItem={(item: ProductData) =>
            renderItem(item, item.productId === value?.productId)
          }
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={Colors.border}
              name="search1"
              size={20}
            />
          )}
        />

        <FlatList
          data={stockItemList}
          keyExtractor={(item) => item.itemId}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <StockItem
              item={item}
              setModalVisible={setModalVisible}
              setDeleteItemId={setDeleteItemId}
            />
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 15,
  },
  title: {
    marginTop: 20,
    color: Colors.white,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 30,
  },
  dropdownTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 20,
  },
  dropdown: {
    height: 50,
    borderColor: Colors.componentBorder,
    elevation: 5,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 8,
    backgroundColor: Colors.componentBg,
    marginBottom: 20,
  },
  dropdownContainer: {
    backgroundColor: "#262626",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.componentBorder,
    // elevation: 5,
  },
  itemTextStyle: {
    color: Colors.white,
  },
  dropDownAddBtn: {
    backgroundColor: Colors.buttonBg,
    width: "18%",
    height: 53,
    borderRadius: 10,
    borderColor: Colors.componentBorder,
    borderWidth: StyleSheet.hairlineWidth,

    alignItems: "center",
    justifyContent: "center",
  },

  itemContainer: {
    padding: 10,
    paddingVertical: 15,
    backgroundColor: "#262626",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#2e2e2e",
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  itemContainerStyle: {
    backgroundColor: Colors.darkBg,
  },
  selectedItemContainer: {
    backgroundColor: Colors.darkBg,
  },
  itemText: {
    color: Colors.white,
  },
  selectedItemText: {
    color: Colors.white,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Colors.border,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.border,
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: Colors.border,
  },
  inputSearchStyle: {
    // height: 40,
    fontSize: 16,
    borderRadius: 10,
    backgroundColor: Colors.darkBg,
    color: Colors.border,
    borderWidth: 0,
  },
});

export default StockList;
