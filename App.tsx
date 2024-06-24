import React from "react";
import { Image, StyleSheet, View } from "react-native";
import "react-native-gesture-handler";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  NavigationContainer,
  DrawerActions,
  DefaultTheme,
} from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

import HomeScreen from "./screens/Home";
import ProfileScreen from "./screens/Profile";
import Colors from "./constants/Colors";
import Menu from "./screens/Menu";
import BuyerInfo from "./screens/create/BuyerInfo";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
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
            color="white"
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={{ marginRight: 15 }}
          />
        ),
        cardStyle: { backgroundColor: Colors.darkBg },
      })}
    >
      <Stack.Screen
        name="home"
        options={{
          title: "Quotations By Sri Tech",
          headerLeft: () => (
            <Image source={require("@img/logo.png")} style={styles.logo} />
          ),
        }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="profile"
        component={ProfileScreen}
        options={{ ...TransitionPresets.SlideFromRightIOS }}
      />
      <Stack.Screen
        name="createPage01"
        component={BuyerInfo}
        options={{
          title: "Create a Quotation",
        }}
      />
    </Stack.Navigator>
  );
}

const App = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.darkBg,
    },
  };

  return (
    <View style={styles.root}>
      <NavigationContainer theme={MyTheme}>
        <StatusBar style="light" />
        <Drawer.Navigator drawerContent={(props) => <Menu {...props} />}>
          <Drawer.Screen
            name="MainStack"
            component={MainStack}
            options={{ headerShown: false }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.darkBg,
  },
  logo: {
    width: 33,
    resizeMode: "contain",
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginRight: 10,
  },
});

export default App;
