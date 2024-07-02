import AsyncStorage from "@react-native-async-storage/async-storage";
import { StockData } from "@/interfaces/stockData";
import useReadAscyncStorage from "./useReadAscyncStorage";
import { ProductData } from "@/interfaces/productsData";

const useDeleteAscyncStorageProducts = () => {
  const readDataAsyncStorage = useReadAscyncStorage();

  const deleteDataAsyncStorageProducts = async (
    itemId: string,
    storageKey: string
  ) => {
    const existingData: ProductData[] | null = await readDataAsyncStorage(
      storageKey
    );

    if (existingData) {
      const updatedData = existingData.filter(
        (item) => item.productId !== itemId
      );

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

  return deleteDataAsyncStorageProducts;
};

export default useDeleteAscyncStorageProducts;
