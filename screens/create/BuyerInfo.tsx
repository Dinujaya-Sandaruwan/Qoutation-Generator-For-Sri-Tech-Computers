import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import { RootStackParamList } from "@/types/navigation";
import {
  useNavigation,
  NavigationProp,
  useIsFocused,
} from "@react-navigation/native";

import AntDesign from "@expo/vector-icons/AntDesign";
import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import { Feather } from "@expo/vector-icons";
import useNavigationStore from "@/zustand/navigationStore";
import useBuildData from "@/zustand/buildDataStore";
import useUniqueId from "@/hooks/useGenerateId";
import useFormattedDate from "@/hooks/useFormattedDate";
import { useToast } from "react-native-toast-notifications";

const BuyerInfo = () => {
  const isThisPage = useIsFocused();
  const setPage = useNavigationStore((state) => state.setPage);

  useEffect(() => {
    isThisPage && setPage("create");
  }, [isThisPage]);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const keyboardVisible = useKeyboardVisibility();
  const marginBottom = keyboardVisible ? 10 : 30;

  const {
    setId,
    setDate,
    setCustomerName,
    setBuildingBudget,
    setAdvancedPayment,
    setMobileNo,
    setAddressLineOne,
    setAddressLineTwo,
    setAdditionalNotes,
    id,
    date,
    customerName,
    buildingBudget,
    advancedPayment,
    mobileNo,
    addressLineOne,
    addressLineTwo,
    additionalNotes,
  } = useBuildData();

  const formattedDate = useFormattedDate();

  useEffect(() => {
    setDate(formattedDate);
  }, [formattedDate]);

  const generateUniqueId = useUniqueId("ST");

  useEffect(() => {
    if (id === "") setId(generateUniqueId());
  }, []);

  const toast = useToast();

  const navigateToPageTwo = () => {
    if (customerName === "") {
      return toast.show(
        "You must need to add a customer name to generate a quotation. 🥲",
        {
          type: "warning",
        }
      );
    }

    navigation.navigate("createPage02");
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Add Order Details</Text>
        <Text style={styles.orderId}>#{id}</Text>
        <View>
          <Text style={styles.inputText}>Customer or Build Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter buyer name here..."
            placeholderTextColor={Colors.border}
            onChangeText={(text) => setCustomerName(text)}
            value={customerName}
          />
        </View>
        <View>
          <Text style={styles.inputText}>Building Budget</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter buyer’s budget here (Rs)..."
            placeholderTextColor={Colors.border}
            onChangeText={(text) => setBuildingBudget(Number(text))}
            value={buildingBudget ? buildingBudget.toString() : ""}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={styles.inputText}>Advanced Payment</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter buyer’s advance here (Rs)..."
            placeholderTextColor={Colors.border}
            onChangeText={(text) => setAdvancedPayment(Number(text))}
            value={advancedPayment ? advancedPayment.toString() : ""}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={styles.inputText}>Mobile Number</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter buyer’s mobile no. here..."
            placeholderTextColor={Colors.border}
            onChangeText={(text) => setMobileNo(text)}
            value={mobileNo}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={styles.inputText}>Address</Text>
          <TextInput
            style={[styles.textInput, { marginBottom: 5 }]}
            placeholder="Address (Line 01)..."
            placeholderTextColor={Colors.border}
            onChangeText={(text) => setAddressLineOne(text)}
            value={addressLineOne}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Address (Line 02)..."
            placeholderTextColor={Colors.border}
            onChangeText={(text) => setAddressLineTwo(text)}
            value={addressLineTwo}
          />
        </View>
        <View>
          <Text style={styles.inputText}>Additional Notes</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Type your additional notes here..."
            placeholderTextColor={Colors.border}
            multiline={true}
            numberOfLines={5}
            textAlignVertical="top"
            onChangeText={(text) => setAdditionalNotes(text)}
            value={additionalNotes}
          />
        </View>
      </ScrollView>
      <View style={[styles.bottomNavigation, { marginBottom: marginBottom }]}>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="home" size={19} color={Colors.white} />
          <Text style={[styles.navBtnText, { marginLeft: 5 }]}>Go to home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={navigateToPageTwo}>
          <Text style={[styles.navBtnText, { marginRight: 5 }]}>
            Go to next page
          </Text>
          <Feather name="chevron-right" size={19} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

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
  inputText: {
    color: Colors.white,
    fontSize: 17,
    marginBottom: 5,
    fontWeight: "700",
    marginTop: 20,
  },
  textInput: {
    backgroundColor: Colors.componentBg,
    color: Colors.white,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 15,
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

export default BuyerInfo;
