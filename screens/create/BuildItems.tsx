import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import BuildItem from "@/components/BuildItem";
import { AntDesign, Feather } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { RootStackParamList } from "@/types/navigation";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";

const BuildItems = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const keyboardVisible = useKeyboardVisibility();
  const marginBottom = keyboardVisible ? 10 : 30;
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Add Order Details</Text>
        <Text style={styles.orderId}>#ST202462385697248</Text>
        <Text style={styles.budgetLimit}>Budget Limit: 75000.00</Text>

        <BuildItem />
        <BuildItem />
        <BuildItem />
      </ScrollView>
      <View style={[styles.bottomNavigation, { marginBottom: marginBottom }]}>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => navigation.goBack()}
        >
          <Feather name="chevron-left" size={19} color={Colors.white} />
          <Text style={[styles.navBtnText, { marginLeft: 5 }]}>
            Go to previous page
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navBtn, { backgroundColor: "#51a34d" }]}
          onPress={() => navigation.navigate("createPage03")}
        >
          <FontAwesome name="gear" size={19} color={Colors.white} />
          <Text style={[styles.navBtnText, { marginLeft: 5 }]}>
            Generate Quotation
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default BuildItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: Colors.background,
  },
  title: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 24,
    marginBottom: 5,
    paddingTop: 25,
  },
  orderId: {
    color: Colors.border,
  },
  budgetLimit: {
    color: Colors.green,
    marginTop: 15,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 25,
  },
  itemView: {
    backgroundColor: Colors.darkBg,
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.componentBorder,
    elevation: 5,
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  navBtn: {
    backgroundColor: Colors.buttonBg,
    width: "48%",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    elevation: 5,
  },
  navBtnText: {
    color: Colors.white,

    fontWeight: "600",
  },
});
