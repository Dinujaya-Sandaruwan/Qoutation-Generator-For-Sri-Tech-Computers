import { DATABASE_ID } from "@/constants/databaseCollections";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import { db } from "@/firebase/config";
import { ProductData } from "@/interfaces/productsData";
import { StockData } from "@/interfaces/stockData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import useCheckInternetConnection from "../useCheckInternetConnection";

const useFirestoreData = <T>(collectionName: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const collectionRef = collection(db, collectionName);
      const querySnapshot = await getDocs(collectionRef);

      const allData = querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as T)
      );
      setData(allData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useFirestoreData;
