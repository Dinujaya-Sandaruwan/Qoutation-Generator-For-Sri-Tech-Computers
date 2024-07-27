import React, { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Colors from "@/constants/Colors";
import useFormatMoney from "@/hooks/useFormatMoney";
import { RootStackParamList } from "@/types/navigation";
import useBuildData from "@/zustand/buildDataStore";
import Feather from "@expo/vector-icons/Feather";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useReducedString from "@/hooks/useReducedString";

interface Props {
  itemValue: string;
  itemType: string;
  itemId: string;
  itemName: string;
  setModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteBuildItem: React.Dispatch<React.SetStateAction<string>>;
  setItemNameState: React.Dispatch<React.SetStateAction<string>>;
  setItemIdState: React.Dispatch<React.SetStateAction<string>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const BuildItem = ({
  itemValue,
  itemType,
  itemId,
  itemName,
  setModelOpen,
  setDeleteBuildItem,
  setItemNameState,
  setItemIdState,
  setModalVisible,
}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setModalVisible(true);
    }, 100);
  };

  // useEffect(() => {

  // }, []);

  const state = true;
  const { buildItems } = useBuildData();

  const currentItem = buildItems?.filter((item) => item.itemId === itemId);

  const format = useFormatMoney();
  const formatedPrice = format(currentItem[0]?.itemPrice);

  const reducedString = useReducedString();

  const generateWarranty = (itemWarranty: number, itemWarrantyType: string) => {
    if (itemWarranty === 0) {
      return "No Warranty";
    }
    if (itemWarranty === 1 && itemWarrantyType === "months") {
      return `Warranty: ${itemWarranty} month`;
    }
    if (itemWarranty === 1 && itemWarrantyType === "years") {
      return `Warranty: ${itemWarranty} year`;
    }
    return `Warranty: ${itemWarranty} ${itemWarrantyType}`;
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={styles.itemView}
        // onPressIn={handlePressIn}
        // onPressOut={handlePressOut}
        onPress={() => {
          setModalVisible(true);
          setItemNameState(itemName);
          setItemIdState(itemId);
        }}
        onLongPress={() => {
          setModelOpen(true);
          setDeleteBuildItem(itemId);
        }}
      >
        {currentItem[0]?.itemName && currentItem[0]?.itemPrice ? (
          <View>
            <Text style={styles.itemTitle}>
              {reducedString(currentItem[0]?.itemName, 27)}
            </Text>
            <Text style={styles.itemPrice}>
              {formatedPrice} x {currentItem[0]?.itemQuantity} ={" "}
              {format(currentItem[0]?.itemPrice * currentItem[0]?.itemQuantity)}
            </Text>
            <Text style={styles.itemPrice}>
              {generateWarranty(
                currentItem[0]?.itemWarranty,
                currentItem[0]?.itemWarrantyType
              )}
            </Text>
          </View>
        ) : (
          <Text style={styles.itemTitle}>{reducedString(itemType, 27)}</Text>
        )}
        {/* <Pressable
          onPress={() => {
            setModelOpen(true);
            setDeleteBuildItem(itemId);
          }}
          style={styles.nxtPageBtn}
        >
          <Ionicons name="close" size={24} color={Colors.white} />
        </Pressable> */}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default BuildItem;

const styles = StyleSheet.create({
  itemView: {
    backgroundColor: Colors.darkBg,
    padding: 17,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.componentBorder,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTitle: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 5,
  },
  itemPrice: {
    color: Colors.itemPrice,
    fontWeight: "600",
    marginTop: 5,
  },
  nxtPageBtn: {
    width: 40,
    // height: "100%",
    padding: 10,
    paddingEnd: 0,
    borderRadius: 5,
    // backgroundColor: Colors.buttonBg,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
