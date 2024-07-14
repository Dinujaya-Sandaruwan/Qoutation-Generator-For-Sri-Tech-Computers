import Loading from "@/components/Loading";
import CloudDBModel from "@/components/models/CloudDBModel";
import Colors from "@/constants/Colors";
import { DATABASE_ID } from "@/constants/databaseCollections";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import useReadAscyncStorage from "@/hooks/asyncStorage/useReadAscyncStorage";
import useDeleteCollectionData from "@/hooks/firebase/udeDeleteFirebaseData";
import useAddDataToFirebase from "@/hooks/firebase/useAddDataToFirebase";
import useFirestoreData from "@/hooks/firebase/useReadAllFirebaseData";
import useCheckInternetConnection from "@/hooks/useCheckInternetConnection";
import { ProductData } from "@/interfaces/productsData";
import { StockData } from "@/interfaces/stockData";
import { RootStackParamList } from "@/types/navigation";
import useNavigationStore from "@/zustand/navigationStore";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useToast } from "react-native-toast-notifications";

const BackupScreen = () => {
  const isThisPage = useIsFocused();
  const setPage = useNavigationStore((state) => state?.setPage);

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

    await fetchStockData();
    await fetchProductData();
  };

  useEffect(() => {
    if (firebaseStockDataError || firebaseProductDataError) {
      toast.show("Something went wrong. Try again.", { type: "danger" });
    }
  }, [firebaseStockDataError, firebaseProductDataError]);

  useEffect(() => {
    const saveData = async () => {
      try {
        const jsonValueStocks = JSON.stringify(firebaseStockData);
        await AsyncStorage.setItem(STORAGE_KEYS.stocks, jsonValueStocks);
      } catch (e) {
        toast.show("Something went wrong. Try again.", { type: "danger" });
      }

      try {
        const jsonValueProducts = JSON.stringify(firebaseProductData);
        await AsyncStorage.setItem(STORAGE_KEYS.products, jsonValueProducts);
      } catch (e) {
        toast.show("Something went wrong. Try again.", { type: "danger" });
      }

      if (firebaseStockData.length && firebaseProductData.length) {
        toast.show("Data restored successfully.", { type: "success" });
      }
    };

    if (firebaseStockData.length || firebaseProductData.length) {
      saveData();
    }
  }, [firebaseStockData, firebaseProductData]);

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
    await deleteCollectionData(DATABASE_ID.stocks);
    await deleteCollectionData(DATABASE_ID.products);

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

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [warning, setWarning] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [warningType, setWarningType] = React.useState<"red" | "yellow">(
    "yellow"
  );
  const [exeFunction, setExeFunction] = React.useState<() => void>(
    () => () => {}
  );

  return (
    <>
      {dataAdding && <Loading message="Uploading Data to DB" />}
      {loading && <Loading message="Checking Internet Connection" />}
      {firebaseStockDataLoading && <Loading message="Stock Data Loading" />}
      {firebaseProductDataLoading && <Loading message="Product Data Loading" />}
      {deleteLoading && <Loading message="Deleting Data from Cloud Server" />}

      <CloudDBModel
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        callBack={exeFunction}
        title={title}
        warning={warning}
        warningType={warningType}
      />

      <ScrollView style={styles.container}>
        <Text style={styles.title}>Cloud Databse</Text>
        <Text style={styles.categoryTitle}>Backup Actions</Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            setTitle("Backup Stock Data");
            setWarning(
              "This action will replace all your stock items (not product categories) in cloud server with the local data."
            );
            setWarningType("yellow");
            setExeFunction(() => handleBackupStockData);
          }}
          style={[styles.button]}
        >
          <Entypo name="upload-to-cloud" size={24} color={Colors.white} />
          <Text style={styles.btnText}>Backup stock data</Text>
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={handleBackupProcuctData}
          onPress={() => {
            setModalVisible(true);
            setTitle("Backup Product Categories");
            setWarning(
              "This action will replace all your product categories (not stock items) in cloud server with the local data."
            );
            setWarningType("yellow");
            setExeFunction(() => handleBackupProcuctData);
          }}
          style={[styles.button]}
        >
          <Entypo name="upload-to-cloud" size={24} color={Colors.white} />
          <Text style={styles.btnText}>Backup product categories</Text>
        </TouchableOpacity>
        <View style={{ height: 20 }} />
        <Text style={styles.categoryTitle}>Delete Actions</Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            setTitle("Flush all data from DB");
            setWarning(
              "This action will delete all your data from the cloud server. If you accidentally deleted all the data (from the server) and you still have the data on your phone, you can restore them to the cloud by using Backup Actions. In such cases, never use Restore Actions."
            );
            setWarningType("red");
            setExeFunction(() => handleFlushData);
          }}
          style={[styles.button, { backgroundColor: Colors.red }]}
        >
          <FontAwesome5 name="trash-restore" size={24} color={Colors.white} />
          <Text style={styles.btnText}>Flush all data from DB</Text>
        </TouchableOpacity>
        <View style={{ height: 20 }} />
        <Text style={styles.categoryTitle}>Restore Actions</Text>
        <TouchableOpacity
          // onPress={handleRestoreData}
          onPress={() => {
            setModalVisible(true);
            setTitle("Restore all data from Cloud");
            setWarning(
              "This action will replace all your local data with the data from cloud server. All unsaved data will be lost."
            );
            setWarningType("yellow");
            setExeFunction(() => handleRestoreData);
          }}
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
        <Text style={styles.impText}>
          Do not interrupt these actions unless you are sure of what you going
          to do. Because such interference can damage your data.
        </Text>
        <View style={{ height: 30 }} />
      </ScrollView>
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
