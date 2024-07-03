import React, { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";

import Colors from "@/constants/Colors";

import { StockData } from "@/interfaces/stockData";

type StockItemProps = {
  item: StockData;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteItemId: React.Dispatch<React.SetStateAction<string>>;
};

const StockItem = (props: StockItemProps) => {
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
          props?.setDeleteItemId(props?.item?.itemId);
        }}
      >
        <Text style={styles.flatlistItelabel}>{props?.item?.itemName}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default StockItem;

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
