import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

import Colors from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/types/navigation";
import { BuildData } from "@/interfaces/buildData";
import useFormatMoney from "@/hooks/useFormatMoney";

interface Props {
  data: { item: BuildData; index: number };
}

const SavedQutationItem = ({ data: { item } }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const formatMoney = useFormatMoney();
  // Calculate price
  let totalPrice = 0;
  item?.buildItems?.forEach((item) => {
    totalPrice += item?.itemPrice * item.itemQuantity;
  });

  const finalPrice = totalPrice + item?.advancedPayment;

  return (
    <View style={styles.qutationItem}>
      <View style={styles.qutationItemLeft}>
        <Text style={styles.qutationItemTitle}>For: {item?.customerName}</Text>
        <Text style={styles.qutationItemDate}>Date: {item?.date}</Text>
        <Text style={styles.qutationItemBudget}>
          Price: {formatMoney(finalPrice)}
        </Text>
      </View>
      <TouchableHighlight
        onPress={() => navigation.navigate("qutationInfo", { item })}
        style={styles.qutationItemRight}
      >
        <AntDesign name="rightcircleo" size={30} color={Colors.rightArrow} />
      </TouchableHighlight>
    </View>
  );
};

export default SavedQutationItem;

const styles = StyleSheet.create({
  qutationItem: {
    width: "100%",
    backgroundColor: Colors.darkBg,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.componentBorder,
    overflow: "hidden",
    height: 100,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  qutationItemLeft: {
    padding: 15,
  },
  qutationItemTitle: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 13,
  },
  qutationItemDate: {
    color: Colors.border,
    fontWeight: "400",
    fontSize: 12,
    marginTop: 3,
  },
  qutationItemBudget: {
    color: Colors.white,
    fontWeight: "900",
    fontSize: 18,
    marginTop: 7,
  },
  qutationItemRight: {
    backgroundColor: Colors.componentBg,
    height: "100%",
    width: "20%",
    justifyContent: "center",
    alignItems: "center",

    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.componentBorder,
  },
});
