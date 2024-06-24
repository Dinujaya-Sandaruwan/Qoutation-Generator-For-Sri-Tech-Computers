import {
  Button,
  Text,
  Touchable,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import {
  createStaticNavigation,
  useNavigation,
} from "@react-navigation/native";

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
