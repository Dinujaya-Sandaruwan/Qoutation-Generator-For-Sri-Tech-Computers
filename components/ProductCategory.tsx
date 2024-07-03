import React, { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";

import Colors from "@/constants/Colors";

import { ProductData } from "@/interfaces/productsData";

type StockItemProps = {
  data: ProductData;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteItemId: React.Dispatch<React.SetStateAction<string>>;
};

const ProductCategory = (props: StockItemProps) => {
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
  };
  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.flatlistItemContainer}
        onLongPress={() => {
          props?.setModalVisible(true);
          props?.setDeleteItemId(props?.data?.productId);
        }}
      >
        <Text style={styles.flatlistItelabel}>{props?.data?.productName}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default ProductCategory;

const styles = StyleSheet.create({
  flatlistItemContainer: {
    padding: 20,
    backgroundColor: Colors.darkBg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.componentBorder,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 5,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flatlistItelabel: {
    color: Colors.white,
    fontWeight: "700",
  },
});
