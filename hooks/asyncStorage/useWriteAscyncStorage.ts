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

    // Check for duplicates based on id and itemId
    const isDuplicate = existingData.some(
      (item: BuildData) =>
        item.id === value.id ||
        item.buildItems.some(
          (buildItem: BuildItem) =>
            buildItem.itemId === value.buildItems[0].itemId
        )
    );

    if (isDuplicate) {
      return { status: "duplicate", error: "Duplicate entry detected." };
    }

    try {
      const jsonValue = JSON.stringify([...existingData, value]);
      await AsyncStorage.setItem(storageKey, jsonValue);

      return { status: "success" };
    } catch (e) {
      return { status: "failed", error: e };
    }
  };

  return storeDataAsyncStorage;
};

export default useWriteAscyncStorage;
