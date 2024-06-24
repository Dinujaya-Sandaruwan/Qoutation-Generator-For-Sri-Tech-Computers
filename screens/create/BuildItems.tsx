import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import BuildItem from "@/components/BuildItem";

const BuildItems = () => {
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
});
