import { BuildData } from "@/interfaces/buildData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useReadAscyncStorage from "./useReadAscyncStorage";

const useWriteAscyncStorage = () => {
  const readDataAsyncStorage = useReadAscyncStorage();

  const storeDataAsyncStorage = async (
    value: BuildData,
    storageKey: string
  ): Promise<{ status: string; error?: string | any }> => {
    const existingData = await readDataAsyncStorage(storageKey);

    // Filter out any existing data that matches the new value based on id or
    let filteredData: BuildData[] = [];
    if (existingData) {
      filteredData = existingData.filter(
        (item: BuildData) => item.id !== value.id
      );
    }

    try {
      const jsonValue = JSON.stringify([...filteredData, value]);
      await AsyncStorage.setItem(storageKey, jsonValue);

      return { status: "success" };
    } catch (e) {
      return { status: "failed", error: e };
    }
  };

  return storeDataAsyncStorage;
};

export default useWriteAscyncStorage;
