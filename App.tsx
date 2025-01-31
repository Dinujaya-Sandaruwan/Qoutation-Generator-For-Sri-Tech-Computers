import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
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
  useNavigation,
} from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ToastProvider } from "react-native-toast-notifications";

import HomeScreen from "./screens/Home";
import Colors from "./constants/Colors";
import Menu from "./screens/Menu";
import BuyerInfo from "./screens/create/BuyerInfo";
import { StatusBar } from "expo-status-bar";
import BuildItems from "./screens/create/BuildItems";
import BuildItemList from "./screens/create/BuildItemList";
import AddDataScreen from "./screens/AddData";
import StockList from "./screens/StockList";
import GeneratingQutation from "./screens/GeneratingQutation";
import ProductCategories from "./screens/ProductCategories";
import QuotationInfo from "./screens/QuotationInfo";
import TemplateScreen from "./screens/Templates";
import BackupScreen from "./screens/Backups";
import CompletedOrdersScreen from "./screens/CompletedOrders";
import CompletdOrderInfoScreen from "./screens/CompletedOrderInfo";

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
          // ...TransitionPresets.SlideFromRightIOS,
          headerLeft: () => (
            <Image source={require("@img/logo.png")} style={styles.logo} />
          ),
        }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="homeslide"
        options={{
          title: "Quotations By Sri Tech",
          ...TransitionPresets.SlideFromRightIOS,
          headerLeft: () => (
            <Image source={require("@img/logo.png")} style={styles.logo} />
          ),
        }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="homeWithoutSlide"
        options={{
          title: "Quotations By Sri Tech",
          headerLeft: () => (
            <Image source={require("@img/logo.png")} style={styles.logo} />
          ),
        }}
        component={HomeScreen}
      />
      {/* <Stack.Screen
        name="createPage01"
        component={BuyerInfo}
        options={{
          title: "Create a Quotation",
          ...TransitionPresets.SlideFromRightIOS,
          headerLeft: () => (
            <Image source={require("@img/logo.png")} style={styles.logo} />
          ),
        }}
      /> */}
      <Stack.Screen
        name="createPage01"
        component={BuyerInfo}
        options={({ navigation, route }) => ({
          title: "Create a Quotation",
          transitionSpec: {
            open: TransitionPresets.DefaultTransition.transitionSpec.open,
            close: TransitionPresets.SlideFromRightIOS.transitionSpec.close,
          },
        })}
      />
      <Stack.Screen
        name="createPage01slide"
        component={BuyerInfo}
        options={{
          title: "Create a Quotation",
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="createPage02"
        component={BuildItems}
        options={{
          title: "Pick Items For PC Build",
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="createPage03"
        component={BuildItemList}
        options={{
          title: "Select The Item",
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="addData"
        component={AddDataScreen}
        options={{
          title: "Add Stock Items",
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="stockList"
        component={StockList}
        options={{
          title: "Stock Items List",
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="generatingQutation"
        component={GeneratingQutation}
        options={{
          title: "Generating...",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="productsList"
        component={ProductCategories}
        options={{
          title: "Manage Product Categories",
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="qutationInfo"
        component={QuotationInfo}
        options={{
          title: "Quotation Details",
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="templates"
        component={TemplateScreen}
        options={{
          title: "Quotation Templates",
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="backups"
        component={BackupScreen}
        options={{
          title: "Create & Restore Backups",
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="completedOrders"
        component={CompletedOrdersScreen}
        options={{
          title: "Completed Orders",
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="CompletdOrderInfoScreen"
        component={CompletdOrderInfoScreen}
        options={{
          title: "Order Details",
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Stack.Navigator>
  );
}

const App = () => {
  const MyTheme = {
    ...DefaultTheme,

    colors: {
      primary: Colors.white,
      background: Colors.background,
      card: Colors.componentBg,
      text: Colors.white,
      border: Colors.border,
      notification: Colors.green,
    },
    background: Colors.darkBg,
  };

  return (
    <View style={styles.root}>
      <ToastProvider>
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
      </ToastProvider>
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
