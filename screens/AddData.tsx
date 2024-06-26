import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import useNavigationStore from "@/zustand/navigationStore";
import { useIsFocused } from "@react-navigation/native";
import Colors from "@/constants/Colors";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { useToast } from "react-native-toast-notifications";

import parts from "@/data/parts.json";
import Loading from "@/components/Loading";
import useWriteAscyncStorage from "@/hooks/asyncStorage/useWriteAscyncStorage";
import useUniqueId from "@/hooks/useGenerateId";

type Item = {
  label: string;
  value: string;
};

const AddDataScreen = () => {
  const isThisPage = useIsFocused();
  const setPage = useNavigationStore((state) => state.setPage);

  useEffect(() => {
    isThisPage && setPage("addData");
  }, [isThisPage]);

  const generateUniqueId = useUniqueId("STOCK");
  const storeDataAsyncStorage = useWriteAscyncStorage();

  const [itemType, setItemType] = useState<Item | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [itemName, setItemName] = useState("");

  const [loading, setLoading] = useState(false);
  const toast = useToast();

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

  const handleSubmit = async () => {
    if (!itemType || !itemName) {
      return toast.show("Please fill all fields", {
        type: "danger",
        placement: "bottom",
        duration: 4000,
        animationType: "slide-in",
      });
    }
    setLoading(true);

    const uniqueId = generateUniqueId();

    const data = await storeDataAsyncStorage({
      itemId: uniqueId,
      itemType: itemType.value,
      itemName: itemName,
    });

    setTimeout(() => {
      setLoading(false);

      if (data.status === "success") {
        toast.show("Item added successfully", {
          type: "success",
          placement: "bottom",
          duration: 4000,
          animationType: "slide-in",
        });
        setItemName("");
      } else {
        toast.show("Something went wrong", {
          type: "danger",
          placement: "bottom",
          duration: 4000,
          animationType: "slide-in",
        });
      }
    }, 1000);
  };

  return (
    <>
      {loading && <Loading />}

      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={60}
      >
        <Text style={styles.title}>Enter Items to Build PC</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Item Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter item name here..."
            placeholderTextColor={Colors.border}
            onChangeText={(text) => setItemName(text)}
            value={itemName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Item Type</Text>
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
            value={itemType}
            dropdownPosition="bottom"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item: Item) => {
              setItemType(item);
              setIsFocus(false);
            }}
            renderItem={(item: Item) =>
              renderItem(item, item.value === itemType?.value)
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
        </View>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Add item</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};

export default AddDataScreen;

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
  textInput: {
    padding: 10,
    backgroundColor: Colors.componentBg,
    marginTop: 5,
    color: Colors.white,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.componentBorder,
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
    marginTop: 5,
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

  submitBtn: {
    backgroundColor: Colors.buttonBg,
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.componentBorder,
    marginTop: 10,

    alignItems: "center",
    justifyContent: "center",
  },
  submitBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
});