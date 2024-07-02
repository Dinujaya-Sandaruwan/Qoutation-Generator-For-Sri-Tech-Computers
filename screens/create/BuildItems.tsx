import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import BuildItem from "@/components/BuildItem";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Dropdown } from "react-native-element-dropdown";

import { RootStackParamList } from "@/types/navigation";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";
import parts from "@/data/parts.json";
import useBuildData from "@/zustand/buildDataStore";
import { BuildItem as BuildItemInterface } from "@/interfaces/buildData";
import useUniqueId from "@/hooks/useGenerateId";
import useFormatMoney from "@/hooks/useFormatMoney";
import BuildItemDeleteModel from "@/components/models/BuildItemDeleteModel";
import { useToast } from "react-native-toast-notifications";
import qutationPdfTemplate from "@/templates/qutationPdfTemplate";
import Loading from "@/components/Loading";
import { ProductData } from "@/interfaces/productsData";
import useReadAscyncStorage from "@/hooks/asyncStorage/useReadAscyncStorage";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import useCheckInternetConnection from "@/hooks/useCheckInternetConnection";

const BuildItems = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const keyboardVisible = useKeyboardVisibility();
  const marginBottom = keyboardVisible ? 10 : 30;

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

  const [dropDownValue, setDropDownValue] = useState<ProductData | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  const toast = useToast();

  // toast.show("Please fill all fields 🥲👍", {
  //   type: "warning",
  // });

  const { id, buildingBudget, buildItems, addBuildItem, deleteBuildItem } =
    useBuildData();

  const generateUniqueId = useUniqueId("ITEM");

  const handleDropdownChange = (value: any) => {
    if (!value) {
      return toast.show("You can't add without selecting an item 🥲", {
        type: "warning",
      });
    }

    const newItem: BuildItemInterface = {
      itemId: generateUniqueId(),
      itemValue: value.productId,
      itemName: "",
      itemType: value.productName,
      itemPrice: 0,
      itemQuantity: 0,
      itemWarranty: 0,
      itemWarrantyType: "",
    };

    addBuildItem(newItem);
    console.log(buildItems);
  };

  const [dynamicBudget, setDynamicBudget] = useState<number>(buildingBudget);

  useEffect(() => {
    let total = 0;
    buildItems.forEach((item) => {
      total += item?.itemPrice;
    });

    setDynamicBudget(buildingBudget - total);
  }, [buildItems]);

  const budgetTextColor = () => {
    if (dynamicBudget === 0) {
      return Colors.green;
    } else if (dynamicBudget < 0) {
      return Colors.red;
    } else if ((buildingBudget / 100) * 30 > dynamicBudget) {
      return Colors.yellow;
    } else {
      console.log((dynamicBudget / 100) * 30);
      return Colors.green;
    }
  };

  const format = useFormatMoney();
  const formatedBudget = format(dynamicBudget);

  const [isModelOpen, setModelOpen] = React.useState(false);
  const [deleteBuildItemState, setDeleteBuildItemState] = React.useState("");

  const handleDeleteItem = () => {
    deleteBuildItem(deleteBuildItemState);
    setModelOpen(false);
  };

  const checkInternetConnection = useCheckInternetConnection();

  const goToGeneratingQutationScreen = async () => {
    const result = await checkInternetConnection();
    if (result.status !== "ok") {
      return;
    }
    if (buildItems.length === 0) {
      return toast.show(
        "You must need to add at least one item to generate a quotation 🥲",
        {
          type: "warning",
        }
      );
    }

    navigation.navigate("generatingQutation", {
      id: id,
    });
  };

  const readDataAsyncStorage = useReadAscyncStorage();
  const [products, setProducts] = useState<ProductData[]>([]);

  const fetchData = async () => {
    const data = await readDataAsyncStorage(STORAGE_KEYS.products);
    setProducts(data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <BuildItemDeleteModel
        isModalVisible={isModelOpen}
        setModalVisible={setModelOpen}
        handleDelete={handleDeleteItem}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Add Order Details</Text>
        <Text style={styles.orderId}>#{id}</Text>
        <Text style={[styles.budgetLimit, { color: budgetTextColor() }]}>
          {buildingBudget === 0
            ? "No budget limit! 🫢"
            : `Budget: ${formatedBudget}`}
        </Text>

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
            data={products}
            search
            maxHeight={300}
            labelField="productName"
            valueField="productId"
            placeholder={!isFocus ? "Select item" : "..."}
            searchPlaceholder="Search..."
            value={dropDownValue}
            dropdownPosition="bottom"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item: ProductData) => {
              setDropDownValue(item);
              setIsFocus(false);
            }}
            renderItem={(item: ProductData) =>
              renderItem(item, item.productId === dropDownValue?.productId)
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
          <TouchableOpacity
            style={styles.dropDownAddBtn}
            onPress={() => {
              handleDropdownChange(dropDownValue);
            }}
          >
            <Entypo name="plus" size={28} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {buildItems.map((item, index) => (
          <BuildItem
            key={index}
            itemValue={item.itemValue}
            itemType={item.itemType}
            itemId={item.itemId}
            setDeleteBuildItem={setDeleteBuildItemState}
            setModelOpen={setModelOpen}
          />
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
          style={[styles.navBtn, { backgroundColor: Colors.btnGreen }]}
          onPress={goToGeneratingQutationScreen}
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
