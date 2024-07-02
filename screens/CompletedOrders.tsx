import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useCallback, useEffect } from "react";
import { RootStackParamList } from "@/types/navigation";
import useNavigationStore from "@/zustand/navigationStore";
import {
  useIsFocused,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import Colors from "@/constants/Colors";
import { ActivityIndicator } from "react-native-paper";
import useFirestoreData from "../hooks/firebase/useReadFirebaseDataWithScroll";
import { ProductData } from "@/interfaces/productsData";
import { DATABASE_ID } from "@/constants/databaseCollections";
import Loading from "@/components/Loading";
import { BuildData } from "@/interfaces/buildData";
import SavedQutationItem from "@/components/SavedQutationItem";
import CompletedOrdersItem from "@/components/CompletedOrdersItem";
import { useToast } from "react-native-toast-notifications";

const CompletedOrdersScreen = () => {
  const isThisPage = useIsFocused();
  const setPage = useNavigationStore((state) => state.setPage);

  useEffect(() => {
    isThisPage && setPage("completedOrders");
  }, [isThisPage]);

  const { data, loading, error, fetchData, hasMore } =
    useFirestoreData<BuildData>(DATABASE_ID.qutations);

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchData();
    }
  }, [loading, hasMore]);

  return (
    <>
      {loading && data.length === 0 && (
        <Loading message="Loading Orders From Cloud Server" />
      )}
      <View style={styles.container}>
        <Text style={styles.title}>Completed Orders List</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          renderItem={(item) => <CompletedOrdersItem data={item} />}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 15,
  },
  title: {
    marginTop: 20,
    color: Colors.white,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 30,
  },
  dropdownTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 20,
  },
});

export default CompletedOrdersScreen;
