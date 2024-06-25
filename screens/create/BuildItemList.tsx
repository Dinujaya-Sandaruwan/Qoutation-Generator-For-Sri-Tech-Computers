import { View, Text, StyleSheet } from "react-native";
import React from "react";
import NavSearch from "@/components/NavSearch";
import Colors from "@/constants/Colors";

const BuildItemList = () => {
  return (
    <>
      <NavSearch />
      <View style={styles.container}></View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: Colors.background,
  },
});

export default BuildItemList;
