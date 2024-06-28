import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface Props {
  setSearchText: (text: string) => void;
  searchText: string;
}

const NavSearch = ({ setSearchText, searchText }: Props) => {
  return (
    <View style={styles.navBottom}>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.search}
          placeholder="Search Saved Qutations..."
          placeholderTextColor={Colors.border}
          value={searchText}
          onChangeText={setSearchText}
        />
        <FontAwesome name="search" size={25} color="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navBottom: {
    backgroundColor: Colors.darkBg,
    width: "100%",
    height: 90,

    paddingHorizontal: 15,

    alignItems: "center",
    justifyContent: "center",
  },
  searchBox: {
    backgroundColor: Colors.componentBg,
    width: "100%",
    height: 50,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    marginBottom: 5,
    padding: 10,

    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  search: {
    fontSize: 14,
    color: "white",
    height: "100%",
    width: "90%",
  },
});

export default NavSearch;
