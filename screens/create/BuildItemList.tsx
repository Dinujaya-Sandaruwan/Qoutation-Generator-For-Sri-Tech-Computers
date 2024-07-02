import React, { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import NavSearch from "@/components/NavSearch";
import PriceModel from "@/components/models/PriceModel";
import Colors from "@/constants/Colors";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import useReadAscyncStorage from "@/hooks/asyncStorage/useReadAscyncStorage";
import { StockData } from "@/interfaces/stockData";

const BuildItemList = ({ route }: any) => {
  const { itemValue, itemId } = route.params;

  const [itemList, setItemList] = useState<StockData[]>([]);
  const readDataAsyncStorage = useReadAscyncStorage();

  useEffect(() => {
    const getData = async () => {
      const data = await readDataAsyncStorage(STORAGE_KEYS.stocks);

      const filteredData = data.filter(
        (item: StockData) => item.itemType === itemValue
      );
      setItemList(filteredData);
    };
    getData();
  }, [itemValue]); // Added dependency array

  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [itemNameState, setItemNameState] = useState<string>("");

  // const { setItemName } = useBuildData();

  const [searchText, setSearchText] = React.useState("");
  const filteredData = itemList.filter((item) =>
    item.itemName.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <>
      <NavSearch searchText={searchText} setSearchText={setSearchText} />

      <KeyboardAvoidingView style={styles.container}>
        <FlatList
          data={filteredData.reverse()}
          keyExtractor={(item) => item.itemId.toString()} // Use itemId instead of index
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          style={styles.itemList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                setItemNameState(item.itemName);
                setModalVisible(!isModalVisible);
              }}
            >
              <Text style={styles.itemText}>
                {index + 1}. {item.itemName}
              </Text>
            </TouchableOpacity>
          )}
        />
        <PriceModel
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          itemId={itemId}
          itemName={itemNameState}
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
