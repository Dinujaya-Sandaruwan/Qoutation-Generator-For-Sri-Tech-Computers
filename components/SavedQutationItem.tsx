import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

import Colors from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/types/navigation";

const SavedQutationItem = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.qutationItem}>
      <View style={styles.qutationItemLeft}>
        <Text style={styles.qutationItemTitle}>For: Dinujaya Sandaruwan</Text>
        <Text style={styles.qutationItemDate}>Date: 2024/06/22</Text>
        <Text style={styles.qutationItemBudget}>Budget: Rs. 57000.00 </Text>
      </View>
      <TouchableHighlight
        onPress={() => navigation.navigate("createPage01")}
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