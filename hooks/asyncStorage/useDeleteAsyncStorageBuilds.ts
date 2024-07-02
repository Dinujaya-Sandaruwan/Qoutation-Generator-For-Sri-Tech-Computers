import AsyncStorage from "@react-native-async-storage/async-storage";
import { StockData } from "@/interfaces/stockData";
import useReadAscyncStorage from "./useReadAscyncStorage";
import { BuildData } from "@/interfaces/buildData";

const useDeleteAscyncStorage = () => {
  const readDataAsyncStorage = useReadAscyncStorage();

  const deleteDataAsyncStorage = async (itemId: string, storageKey: string) => {
    const existingData: BuildData[] | null = await readDataAsyncStorage(
      storageKey
    );

    if (existingData) {
      const updatedData = existingData.filter((item) => item.id !== itemId);

      try {
        const jsonValue = JSON.stringify(updatedData);
        await AsyncStorage.setItem(storageKey, jsonValue);

        return { status: "success" };
      } catch (e) {
        return { status: "failed", error: e };
      }
    } else {
      return { status: "failed", error: "No data found" };
    }
  };

  return deleteDataAsyncStorage;
};

export default useDeleteAscyncStorage;
