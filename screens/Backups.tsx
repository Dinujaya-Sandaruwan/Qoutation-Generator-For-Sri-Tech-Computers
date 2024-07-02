import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { RootStackParamList } from "@/types/navigation";
import useNavigationStore from "@/zustand/navigationStore";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import {
  useIsFocused,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import Colors from "@/constants/Colors";

const BackupScreen = () => {
  const isThisPage = useIsFocused();
  const setPage = useNavigationStore((state) => state.setPage);

  useEffect(() => {
    isThisPage && setPage("backups");
  }, [isThisPage]);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cloud Databse</Text>
      <Text style={styles.categoryTitle}>Backup Actions</Text>
      <TouchableOpacity onPress={() => {}} style={[styles.button]}>
        <Entypo name="upload-to-cloud" size={24} color={Colors.white} />
        <Text style={styles.btnText}>Backup stock data</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}} style={[styles.button]}>
        <Entypo name="upload-to-cloud" size={24} color={Colors.white} />
        <Text style={styles.btnText}>Backup product categories</Text>
      </TouchableOpacity>
      <View style={{ height: 20 }} />
      <Text style={styles.categoryTitle}>Delete Actions</Text>
      <TouchableOpacity
        onPress={() => {}}
        style={[styles.button, { backgroundColor: Colors.red }]}
      >
        <FontAwesome5 name="trash-restore" size={24} color={Colors.white} />
        <Text style={styles.btnText}>Flush stock data</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {}}
        style={[styles.button, { backgroundColor: Colors.red }]}
      >
        <FontAwesome5 name="trash-restore" size={24} color={Colors.white} />
        <Text style={styles.btnText}>Flush product categories</Text>
      </TouchableOpacity>
      <View style={{ height: 20 }} />
      <Text style={styles.categoryTitle}>Restore Actions</Text>
      <TouchableOpacity
        onPress={() => {}}
        style={[styles.button, { backgroundColor: Colors.btnYellow }]}
      >
        <MaterialIcons
          name="settings-backup-restore"
          size={24}
          color={Colors.white}
        />
        <Text style={styles.btnText}>Restore stock data</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {}}
        style={[styles.button, { backgroundColor: Colors.btnYellow }]}
      >
        <MaterialIcons
          name="settings-backup-restore"
          size={24}
          color={Colors.white}
        />
        <Text style={styles.btnText}>Restore product categories</Text>
      </TouchableOpacity>

      <Text style={styles.impText}>
        <Text style={{ fontWeight: "900" }}>Important:</Text> Backup and delete
        actions will only affect to the server. They will change all data in
        server at once. Restore actions will affect to the local storage and
        they will synchronize all your local data with cloud storage at once.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 15,
  },
  title: {
    marginTop: 20,
    color: Colors.white,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 30,
  },
  categoryTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.buttonBg,
    width: "100%",
    height: 53,
    borderRadius: 10,
    borderColor: Colors.componentBorder,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 10,
    elevation: 5,
  },
  btnText: {
    color: Colors.white,
    marginLeft: 10,
  },
  impText: {
    color: Colors.border,
    fontSize: 14,
    marginTop: 20,
  },
});

export default BackupScreen;
