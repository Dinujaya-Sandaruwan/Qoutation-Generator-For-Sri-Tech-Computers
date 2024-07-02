import React, { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

import Colors from "@/constants/Colors";
import useFormatMoney from "@/hooks/useFormatMoney";
import { RootStackParamList } from "@/types/navigation";
import useBuildData from "@/zustand/buildDataStore";
import Feather from "@expo/vector-icons/Feather";
import { NavigationProp, useNavigation } from "@react-navigation/native";

interface Props {
  itemValue: string;
  itemType: string;
  itemId: string;
  setModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteBuildItem: React.Dispatch<React.SetStateAction<string>>;
}

const BuildItem = ({
  itemValue,
  itemType,
  itemId,
  setModelOpen,
  setDeleteBuildItem,
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

    // setTimeout(() => {
    //   navigation.navigate("createPage03");
    // }, 100);
  };

  const state = true;
  const { buildItems } = useBuildData();

  const currentItem = buildItems.filter((item) => item.itemId === itemId);

  const format = useFormatMoney();
  const formatedPrice = format(currentItem[0]?.itemPrice);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        style={styles.itemView}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onLongPress={() => {
          setModelOpen(true);
          setDeleteBuildItem(itemId);
        }}
      >
        {currentItem[0].itemName && currentItem[0]?.itemPrice ? (
          <View>
            <Text style={styles.itemTitle}>{currentItem[0]?.itemName}</Text>
            <Text style={styles.itemPrice}>
              {formatedPrice} x {currentItem[0]?.itemQuantity} ={" "}
              {format(currentItem[0]?.itemPrice * currentItem[0]?.itemQuantity)}
            </Text>
          </View>
        ) : (
          <Text style={styles.itemTitle}>{itemType}</Text>
        )}

        <Pressable
          onPress={() =>
            navigation.navigate("createPage03", { itemValue, itemId })
          }
          style={styles.nxtPageBtn}
        >
          <Feather name="chevron-right" size={24} color={Colors.white} />
        </Pressable>
      </Pressable>
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
