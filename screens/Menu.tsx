// screens/Menu.tsx
import React from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Colors from "@/constants/Colors";
import useNavigationStore from "@/zustand/navigationStore";
import { RootStackParamList } from "@/types/navigation";
import { useNavigation, NavigationProp } from "@react-navigation/native";

const Menu = (props: DrawerContentComponentProps) => {
  const page = useNavigationStore((state) => state.page);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <Text style={styles.title}>Navigation Menu</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("home")}
        style={[
          styles.menuItemContainer,
          {
            backgroundColor:
              page === "home" ? Colors.componentBg : Colors.darkBg,
          },
        ]}
      >
        <FontAwesome5 name="home" size={24} color={Colors.white} />
        <Text style={styles.menuItemText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("createPage01")}
        style={[
          styles.menuItemContainer,
          {
            backgroundColor:
              page === "create" ? Colors.componentBg : Colors.darkBg,
          },
        ]}
      >
        <Entypo name="circle-with-plus" size={24} color={Colors.white} />
        <Text style={styles.menuItemText}>Create Qutations</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("addData")}
        style={[
          styles.menuItemContainer,
          {
            backgroundColor:
              page === "addData" ? Colors.componentBg : Colors.darkBg,
          },
        ]}
      >
        <Entypo name="add-to-list" size={24} color={Colors.white} />
        <Text style={styles.menuItemText}>Add Stock Items</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("stockList")}
        style={[
          styles.menuItemContainer,
          {
            backgroundColor:
              page === "stockList" ? Colors.componentBg : Colors.darkBg,
          },
        ]}
      >
        <Entypo name="list" size={24} color={Colors.white} />
        <Text style={styles.menuItemText}>Stock List</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("productsList")}
        style={[
          styles.menuItemContainer,
          {
            backgroundColor:
              page === "productsList" ? Colors.componentBg : Colors.darkBg,
          },
        ]}
      >
        <MaterialIcons
          name="create-new-folder"
          size={24}
          color={Colors.white}
        />
        <Text style={styles.menuItemText}>Product Categories</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBg,
    padding: 15,
  },
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: "bold",

    marginLeft: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  menuItemContainer: {
    padding: 10,

    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  menuItemText: {
    color: Colors.white,
    fontSize: 18,
    marginLeft: 15,
  },
});

export default Menu;
