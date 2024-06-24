import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";

import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

import HomeScreen from "./screens/Home";
import ProfileScreen from "./screens/Profile";
import Colors from "./constants/Colors";

const Stack = createStackNavigator();

export default function App() {
  const handlePress = () => {
    // navigation.dispatch(DrawerActions.openDrawer());
  };
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.darkBg,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },

          headerTintColor: "white",

          headerRight: () => (
            <AntDesign
              name="menu-unfold"
              size={24}
              color="black"
              onPress={handlePress}
              style={{ color: "white", marginRight: 15 }}
            />
          ),
        }}
      >
        <Stack.Screen
          name="Home"
          options={{
            headerLeft: () => (
              <Image source={require("@img/logo.png")} style={styles.logo} />
            ),
          }}
          component={HomeScreen}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 33,
    objectFit: "contain",
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
