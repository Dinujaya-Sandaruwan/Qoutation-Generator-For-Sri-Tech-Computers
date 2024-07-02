import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { RootStackParamList } from "@/types/navigation";
import useNavigationStore from "@/zustand/navigationStore";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  useIsFocused,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import Colors from "@/constants/Colors";
import useAddDataToFirebase from "@/hooks/firebase/useAddDataToFirebase";
import useReadAscyncStorage from "@/hooks/asyncStorage/useReadAscyncStorage";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import { DATABASE_ID } from "@/constants/databaseCollections";
import Loading from "@/components/Loading";
import { useToast } from "react-native-toast-notifications";
import useWriteAscyncStorage from "@/hooks/asyncStorage/useWriteAscyncStorage";
import { StockData } from "@/interfaces/stockData";
import useFirestoreData from "@/hooks/firebase/useReadAllFirebaseData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useDeleteCollectionData from "@/hooks/firebase/udeDeleteFirebaseData";
import { ProductData } from "@/interfaces/productsData";
import useCheckInternetConnection from "@/hooks/useCheckInternetConnection";

const BackupScreen = () => {
  const isThisPage = useIsFocused();
  const setPage = useNavigationStore((state) => state.setPage);

  useEffect(() => {
    isThisPage && setPage("backups");
  }, [isThisPage]);

  const checkInternetConnection = useCheckInternetConnection();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();

  const {
    addDataToFirebase,
    loading: dataAdding,
    error: dataAddingError,
  } = useAddDataToFirebase();
  const readDataAsyncStorage = useReadAscyncStorage();

  const handleBackupStockData = async () => {
    setLoading(true);
    const result = await checkInternetConnection();
    setLoading(false);
    if (result.status !== "ok") {
      setLoading(false);
      return;
    }
    const data = await readDataAsyncStorage(STORAGE_KEYS.stocks);
    await addDataToFirebase(data, DATABASE_ID.stocks);

    if (dataAddingError) {
      return toast.show("Something went wrong. Try again.", { type: "danger" });
    } else {
      return toast.show("Stock data backed up successfully.", {
        type: "success",
      });
    }
  };

  const handleBackupProcuctData = async () => {
    setLoading(true);
    const result = await checkInternetConnection();
    setLoading(false);
    if (result.status !== "ok") {
      setLoading(false);
      return;
    }
    const data = await readDataAsyncStorage(STORAGE_KEYS.products);
    await addDataToFirebase(data, DATABASE_ID.products);

    if (dataAddingError) {
      return toast.show("Something went wrong. Try again.", { type: "danger" });
    } else {
      return toast.show("Product categories backed up successfully.", {
        type: "success",
      });
    }
  };

  const {
    data: firebaseStockData,
    loading: firebaseStockDataLoading,
    error: firebaseStockDataError,
    fetchData: fetchStockData,
  } = useFirestoreData<StockData>(DATABASE_ID.stocks);

  const {
    data: firebaseProductData,
    loading: firebaseProductDataLoading,
    error: firebaseProductDataError,
    fetchData: fetchProductData,
  } = useFirestoreData<ProductData>(DATABASE_ID.products);

  const handleRestoreData = async () => {
    setLoading(true);
    const result = await checkInternetConnection();
    setLoading(false);
    if (result.status !== "ok") {
      setLoading(false);
      return;
    }
    setLoading(true);

    await fetchStockData();
    await fetchProductData();

    if (firebaseStockDataError || firebaseProductDataError) {
      setLoading(false);
      return toast.show("Something went wrong. Try again.", { type: "danger" });
    }

    if (firebaseStockDataLoading || firebaseProductDataLoading) {
      setLoading(false);
      return;
    }

    try {
      const jsonValueStocks = JSON.stringify(firebaseStockData);
      await AsyncStorage.setItem(STORAGE_KEYS.stocks, jsonValueStocks);
    } catch (e) {
      setLoading(false);
      return toast.show("Something went wrong. Try again.", { type: "danger" });
    }

    try {
      const jsonValueProducts = JSON.stringify(firebaseProductData);
      await AsyncStorage.setItem(STORAGE_KEYS.products, jsonValueProducts);
    } catch (e) {
      setLoading(false);
      return toast.show("Something went wrong. Try again.", { type: "danger" });
    }

    setLoading(false);
    return toast.show("Data restored successfully.", { type: "success" });
  };

  const {
    deleteCollectionData,
    loading: deleteLoading,
    error: deleteError,
    success: deleteSucess,
  } = useDeleteCollectionData();

  const handleFlushData = async () => {
    setLoading(true);
    const result = await checkInternetConnection();
    setLoading(false);
    if (result.status !== "ok") {
      setLoading(false);
      return;
    }
    deleteCollectionData(DATABASE_ID.stocks);
    deleteCollectionData(DATABASE_ID.products);

    if (deleteError) {
      setLoading(false);
      return toast.show("Something went wrong. Try again.", { type: "danger" });
    } else {
      setLoading(false);
      return toast.show("All data flushed from the cloud DB successfully.", {
        type: "success",
      });
    }
  };

  return (
    <>
      {(dataAdding ||
        loading ||
        firebaseStockDataLoading ||
        firebaseProductDataLoading ||
        deleteLoading) && <Loading />}
      <View style={styles.container}>
        <Text style={styles.title}>Cloud Databse</Text>
        <Text style={styles.categoryTitle}>Backup Actions</Text>
        <TouchableOpacity
          onPress={handleBackupStockData}
          style={[styles.button]}
        >
          <Entypo name="upload-to-cloud" size={24} color={Colors.white} />
          <Text style={styles.btnText}>Backup stock data</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleBackupProcuctData}
          style={[styles.button]}
        >
          <Entypo name="upload-to-cloud" size={24} color={Colors.white} />
          <Text style={styles.btnText}>Backup product categories</Text>
        </TouchableOpacity>
        <View style={{ height: 20 }} />
        <Text style={styles.categoryTitle}>Delete Actions</Text>
        <TouchableOpacity
          onPress={handleFlushData}
          style={[styles.button, { backgroundColor: Colors.red }]}
        >
          <FontAwesome5 name="trash-restore" size={24} color={Colors.white} />
          <Text style={styles.btnText}>Flush all data from DB</Text>
        </TouchableOpacity>
        <View style={{ height: 20 }} />
        <Text style={styles.categoryTitle}>Restore Actions</Text>
        <TouchableOpacity
          onPress={handleRestoreData}
          style={[styles.button, { backgroundColor: Colors.btnYellow }]}
        >
          <MaterialIcons
            name="settings-backup-restore"
            size={24}
            color={Colors.white}
          />
          <Text style={styles.btnText}>Restore all data from Cloud</Text>
        </TouchableOpacity>
        <Text style={styles.impText}>
          <Text style={{ fontWeight: "900" }}>Important:</Text> Backup and
          delete actions will only affect to the server. They will change all
          data in server at once. Restore actions will affect to the local
          storage and they will synchronize all your local data with cloud
          storage at once.
        </Text>
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
  categoryTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.buttonBg,
    width: "100%",
    height: 53,
    borderRadius: 10,
    borderColor: Colors.componentBorder,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 10,
    elevation: 5,
  },
  btnText: {
    color: Colors.white,
    marginLeft: 10,
  },
  impText: {
    color: Colors.border,
    fontSize: 14,
    marginTop: 20,
  },
});

export default BackupScreen;
