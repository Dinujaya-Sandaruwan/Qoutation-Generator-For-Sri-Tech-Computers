import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import BuildItem from "@/components/BuildItem";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Dropdown } from "react-native-element-dropdown";

import { RootStackParamList } from "@/types/navigation";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";

const data = [
  { label: "Keyboard", value: "1" },
  { label: "MotherBoard", value: "2" },
  { label: "Processor", value: "3" },
  { label: "Casing", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const BuildItems = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const keyboardVisible = useKeyboardVisibility();
  const marginBottom = keyboardVisible ? 10 : 30;

  const [itemList, setItemList] = useState<string[]>([]);

  const [value, setValue] = useState("");
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
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Add Order Details</Text>
        <Text style={styles.orderId}>#ST202462385697248</Text>
        <Text style={styles.budgetLimit}>Budget Limit: 75000.00</Text>

        <View style={styles.dropDownView}>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            containerStyle={styles.dropdownContainer}
            itemTextStyle={styles.itemTextStyle}
            itemContainerStyle={styles.itemContainerStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Select item" : "..."}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
            renderItem={(item) => renderItem(item, item.value === value)}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={Colors.border}
                name="search1"
                size={20}
              />
            )}
          />
          <TouchableOpacity
            style={styles.dropDownAddBtn}
            onPress={() => setItemList([...itemList, value])}
          >
            <Entypo name="plus" size={28} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {itemList.map((item, index) => (
          <BuildItem key={index} />
        ))}
      </ScrollView>
      <View style={[styles.bottomNavigation, { marginBottom: marginBottom }]}>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => navigation.goBack()}
        >
          <Feather name="chevron-left" size={19} color={Colors.white} />
          <Text style={[styles.navBtnText, { marginLeft: 5 }]}>
            Go to previous page
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navBtn, { backgroundColor: "#51a34d" }]}
          onPress={() => navigation.navigate("createPage03")}
        >
          <FontAwesome name="gear" size={19} color={Colors.white} />
          <Text style={[styles.navBtnText, { marginLeft: 5 }]}>
            Generate Quotation
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default BuildItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: Colors.background,
  },
  title: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 24,
    marginBottom: 5,
    paddingTop: 25,
  },
  orderId: {
    color: Colors.border,
  },
  budgetLimit: {
    color: Colors.green,
    marginTop: 15,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 25,
  },

  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  navBtn: {
    backgroundColor: Colors.buttonBg,
    width: "48%",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    elevation: 5,
  },
  navBtnText: {
    color: Colors.white,
    fontWeight: "600",
  },
  dropDownView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
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
    width: "80%",
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
