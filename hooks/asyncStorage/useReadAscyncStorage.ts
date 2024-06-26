import AsyncStorage from "@react-native-async-storage/async-storage";

const useReadAscyncStorage = () => {
  const readDataAsyncStorage = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      return { status: "failed", error: e };
    }
  };

  return readDataAsyncStorage;
};

export default useReadAscyncStorage;
