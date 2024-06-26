import { View, Text, StyleSheet, Pressable, Animated } from "react-native";
import React, { useRef } from "react";
import Foundation from "@expo/vector-icons/Foundation";

import Colors from "@/constants/Colors";
import { Modal } from "react-native-paper";

const StockItem = ({ item }) => {
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

    // setTimeout(() => {
    //   navigation.navigate("createPage03");
    // }, 100);
  };
  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.flatlistItemContainer}
      >
        <Text style={styles.flatlistItelabel}>{item.label}</Text>
        <Foundation name="trash" size={24} color={Colors.white} />
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
