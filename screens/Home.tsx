import React, { useEffect, useRef } from "react";

import NavSearch from "@/components/NavSearch";
import SavedQutationItem from "@/components/SavedQutationItem";
import Colors from "@/constants/Colors";
import { RootStackParamList } from "@/types/navigation";
import { AntDesign } from "@expo/vector-icons";
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
} from "react-native";
import useNavigationStore from "@/zustand/navigationStore";

import useReadAscyncStorage from "@/hooks/asyncStorage/useReadAscyncStorage";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import { BuildData } from "@/interfaces/buildData";
import useBuildData from "@/zustand/buildDataStore";
import Loading from "@/components/Loading";

function HomeScreen() {
  const isThisPage = useIsFocused();
  const setPage = useNavigationStore((state) => state.setPage);

  useEffect(() => {
    isThisPage && setPage("home");
  }, [isThisPage]);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const {
    setId,
    setDate,
    setCustomerName,
    setBuildingBudget,
    setAdvancedPayment,
    setMobileNo,
    setAddressLineOne,
    setAddressLineTwo,
    setAdditionalNotes,
    setBuildItems,
  } = useBuildData();

  const [loadingPage, setLoadingPage] = React.useState(false);

  const handleCreateQutation = async () => {
    setId("");
    setDate("");
    setCustomerName("");
    setBuildingBudget(0);
    setAdvancedPayment(0);
    setMobileNo("");
    setAddressLineOne("");
    setAddressLineTwo("");
    setAdditionalNotes("");
    setBuildItems([]);
    navigation.navigate("createPage01");
  };

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

    setLoadingPage(true);

    setTimeout(() => {
      handleCreateQutation();
      setLoadingPage(false);
    }, 50);
  };

  const readDataAsyncStorage = useReadAscyncStorage();
  const [data, setData] = React.useState<BuildData[]>([] as BuildData[]);
  useEffect(() => {
    readDataAsyncStorage(STORAGE_KEYS.qutations).then((data) => {
      setData(data);
    });
  }, []);

  const [searchText, setSearchText] = React.useState("");
  const [filteredData, setFilteredData] = React.useState<BuildData[]>(data);

  const searchQutations = (data: BuildData[], searchText: string) => {
    if (searchText === "") return data;
    return data.filter((item) => {
      const searchString = searchText.toLowerCase();
      return (
        item.customerName.toLowerCase().includes(searchString) ||
        item.date.toLowerCase().includes(searchString) ||
        item.buildingBudget.toString().includes(searchString)
      );
    });
  };

  useEffect(() => {
    setFilteredData(searchQutations(data, searchText));
  }, [searchText, data]);

  return (
    <>
      {loadingPage && <Loading />}
      <NavSearch searchText={searchText} setSearchText={setSearchText} />
      <KeyboardAvoidingView style={styles.container}>
        {data.length === 0 ? (
          <>
            <Text style={styles.title}>No Draft Quotations</Text>
            <View style={styles.noDataContainer}>
              <Image
                source={require("@img/noDraft.png")}
                style={styles.noDataImage}
                resizeMode="contain"
              />
            </View>
          </>
        ) : (
          <FlatList
            data={filteredData.reverse()}
            ListHeaderComponent={() => (
              <Text style={styles.title}>Draft Quotations</Text>
            )}
            renderItem={(item) => <SavedQutationItem data={item} />}
            ListFooterComponent={() => <View style={{ height: 55 }} />}
            ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={5}
          />
        )}
      </KeyboardAvoidingView>
      <View style={styles.footer}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.createBtn}
          >
            <AntDesign name="plus" size={50} color={Colors.white} />
          </Pressable>
        </Animated.View>
      </View>
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: Colors.background,
  },
  title: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 24,
    marginBottom: 20,
    paddingTop: 25,
  },
  createBtn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.componentBg,
    marginTop: -50,
    borderWidth: 8,
    borderColor: Colors.background,

    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    height: 63,
    backgroundColor: "#151515",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#6200ee",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  noDataContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  noDataImage: {
    width: "80%",
    opacity: 0.1,
    marginTop: -30,
  },
});
