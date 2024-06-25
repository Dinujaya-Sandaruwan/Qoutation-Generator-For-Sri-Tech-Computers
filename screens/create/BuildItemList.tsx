import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
  Button,
  Pressable,
} from "react-native";
import React, { useState } from "react";

import Colors from "@/constants/Colors";
import NavSearch from "@/components/NavSearch";
import PriceModel from "@/components/models/PriceModel";

const data = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
];

const BuildItemList = ({ route }: any) => {
  const { value } = route.params;
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  return (
    <>
      <NavSearch />

      <KeyboardAvoidingView style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          style={styles.itemList}
          renderItem={({ index }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => setModalVisible(!isModalVisible)}
            >
              <Text style={styles.itemText}>
                {index + 1}. GPU: Nvidia GTX 1080 8GB
              </Text>
            </TouchableOpacity>
          )}
        />
        <PriceModel
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
        />
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: Colors.background,
    paddingTop: 20,
  },
  item: {
    backgroundColor: Colors.darkBg,
    padding: 15,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.componentBorder,
    elevation: 5,
  },
  itemText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  itemList: {
    marginBottom: 20,
  },

  modelContainer: {
    backgroundColor: Colors.darkBg,
    height: 200,
    borderRadius: 10,
    elevation: 5,
    padding: 20,
  },
  modelCloseBtn: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modellabel: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 18,
  },
  priceInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  priceInputBtn: {
    width: 50,
    height: 50,
    backgroundColor: Colors.buttonBg,
    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",
  },
  priceInput: {
    width: 200,
    height: 50,
    backgroundColor: Colors.componentBg,
    borderRadius: 10,
    color: Colors.white,
    paddingHorizontal: 10,
  },
});

export default BuildItemList;
