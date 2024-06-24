import NavSearch from "@/components/NavSearch";
import { useNavigation } from "@react-navigation/native";
import { Button, Text, TouchableOpacity, View } from "react-native";

function HomeScreen() {
  const navigation = useNavigation();
  return (
    <>
      <NavSearch />
    </>
  );
}

export default HomeScreen;
