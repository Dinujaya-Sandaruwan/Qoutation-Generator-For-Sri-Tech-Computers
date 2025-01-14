// screens/Menu.tsx
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  useDrawerStatus,
} from "@react-navigation/drawer";
import React, { useEffect } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Colors from "@/constants/Colors";
import { RootStackParamList } from "@/types/navigation";
import useNavigationStore from "@/zustand/navigationStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const Menu = (props: DrawerContentComponentProps) => {
  const page = useNavigationStore((state) => state.page);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const currentYear = new Date().getFullYear();
  const drawerStatus = useDrawerStatus();

  useEffect(() => {
    if (drawerStatus === "open") {
      Keyboard.dismiss();
    }
  }, [drawerStatus]);
  return (
    <>
      <DrawerContentScrollView {...props} style={styles.container}>
        <Text style={styles.title}>Navigation Menu</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("homeslide")}
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
          onPress={() => navigation.navigate("createPage01slide")}
          style={[
            styles.menuItemContainer,
            {
              backgroundColor:
                page === "create" ? Colors.componentBg : Colors.darkBg,
            },
          ]}
        >
          <Entypo name="circle-with-plus" size={24} color={Colors.white} />
          <Text style={styles.menuItemText}>Create or Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("templates")}
          style={[
            styles.menuItemContainer,
            {
              backgroundColor:
                page === "templates" ? Colors.componentBg : Colors.darkBg,
            },
          ]}
        >
          <FontAwesome name="file-text" size={24} color={Colors.white} />
          <Text style={styles.menuItemText}>Quotation Templates</Text>
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
        <TouchableOpacity
          onPress={() => navigation.navigate("completedOrders")}
          style={[
            styles.menuItemContainer,
            {
              backgroundColor:
                page === "completedOrders" ? Colors.componentBg : Colors.darkBg,
            },
          ]}
        >
          <Ionicons
            name="checkmark-done-circle-sharp"
            size={24}
            color={Colors.white}
          />
          <Text style={styles.menuItemText}>Completed Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("backups")}
          style={[
            styles.menuItemContainer,
            {
              backgroundColor:
                page === "backups" ? Colors.componentBg : Colors.darkBg,
            },
          ]}
        >
          <Ionicons name="server-sharp" size={24} color={Colors.white} />
          <Text style={styles.menuItemText}>Cloud Database</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
      <View style={styles.copyrightContainer}>
        <Text style={styles.copyright}>
          Copyright &copy; {currentYear} Sri Tech Computers. All rights
          reserved.
        </Text>
      </View>
    </>
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
    paddingHorizontal: 15,
    paddingVertical: 15,

    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  menuItemText: {
    color: Colors.white,
    fontSize: 18,
    marginLeft: 15,
  },
  copyrightContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
  },
  copyright: {
    color: Colors.white,
    fontSize: 10,
    marginLeft: 15,
    textAlign: "center",
    opacity: 0.3,
  },
});

export default Menu;
