import { View, Text, Pressable, StyleSheet, Animated } from "react-native";
import React, { useRef } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

import Feather from "@expo/vector-icons/Feather";
import Colors from "@/constants/Colors";
import { RootStackParamList } from "@/types/navigation";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useBuildData from "@/zustand/buildDataStore";

interface Props {
  itemValue: string;
  itemType: string;
  itemId: string;
}

const BuildItem = ({ itemValue, itemType, itemId }: Props) => {
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

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        style={styles.itemView}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {currentItem[0].itemName && currentItem[0].itemPrice ? (
          <View>
            <Text style={styles.itemTitle}>{currentItem[0].itemName}</Text>
            <Text style={styles.itemPrice}>
              Rs.{currentItem[0].itemPrice}.00
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
