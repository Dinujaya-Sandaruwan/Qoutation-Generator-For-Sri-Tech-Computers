import { useNavigation } from "@react-navigation/native";
import { Button, Text, TouchableOpacity, View } from "react-native";

function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Profile")}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text>Go to Details</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;
