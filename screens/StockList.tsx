import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import useNavigationStore from "@/zustand/navigationStore";
import { useIsFocused } from "@react-navigation/native";
import Colors from "@/constants/Colors";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";

import parts from "@/data/parts.json";
import StockItem from "@/components/StockItem";
import { Modal } from "react-native-paper";

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

  const [value, setValue] = useState<Item | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderItem = (
    item: {
      label: string;
      value: string;
    },
    selected: boolean
  ) => (
    <View
      style={[styles.itemContainer, selected && styles.selectedItemContainer]}
    >
      <Text style={[styles.itemText, selected && styles.selectedItemText]}>
        {item.label}
      </Text>
    </View>
  );

  return (
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
        data={parts}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "..."}
        searchPlaceholder="Search..."
        value={value}
        dropdownPosition="bottom"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item: Item) => {
          setValue(item);
          setIsFocus(false);
        }}
        renderItem={(item: Item) =>
          renderItem(item, item.value === value?.value)
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
        data={parts}
        keyExtractor={(item) => item.value}
        renderItem={({ item }) => <StockItem item={item} />}
      />
    </View>
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
