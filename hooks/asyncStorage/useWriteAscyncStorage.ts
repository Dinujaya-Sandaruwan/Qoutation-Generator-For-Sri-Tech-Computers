import AsyncStorage from "@react-native-async-storage/async-storage";
import { StockData } from "@/interfaces/stockData";
import useReadAscyncStorage from "./useReadAscyncStorage";

const useWriteAscyncStorage = () => {
  const readDataAsyncStorage = useReadAscyncStorage();

  const storeDataAsyncStorage = async (
    value: StockData,
    storageKey: string
  ) => {
    const existingData = await readDataAsyncStorage(storageKey);

    try {
      const jsonValue = JSON.stringify([...(existingData || []), value]);
      await AsyncStorage.setItem(storageKey, jsonValue);

      return { status: "success" };
    } catch (e) {
      return { status: "failed", error: e };
    }
  };

  return storeDataAsyncStorage;
};

export default useWriteAscyncStorage;
