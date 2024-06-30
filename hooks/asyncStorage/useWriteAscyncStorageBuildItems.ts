import AsyncStorage from "@react-native-async-storage/async-storage";
import { BuildData, BuildItem } from "@/interfaces/buildData";
import useReadAscyncStorage from "./useReadAscyncStorage";

const useWriteAscyncStorage = () => {
  const readDataAsyncStorage = useReadAscyncStorage();

  const storeDataAsyncStorage = async (
    value: BuildData,
    storageKey: string
  ): Promise<{ status: string; error?: string | any }> => {
    const existingData = await readDataAsyncStorage(storageKey);

    // Filter out any existing data that matches the new value based on id or itemId
    const filteredData = existingData.filter(
      (item: BuildData) =>
        item.id !== value.id &&
        !item.buildItems.some(
          (buildItem: BuildItem) =>
            buildItem.itemId === value.buildItems[0].itemId
        )
    );

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
