import React, { useRef, useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";

import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";

import LottieView from "lottie-react-native";
import Colors from "@/constants/Colors";
import qutationPdfTemplate from "@/templates/qutationPdfTemplate";
import useWriteAscyncStorage from "@/hooks/asyncStorage/useWriteAscyncStorageBuildItems";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import useBuildData from "@/zustand/buildDataStore";
import { RootStackParamList } from "@/types/navigation";
import Loading from "@/components/Loading";
import { useToast } from "react-native-toast-notifications";

export default function GeneratingQutation({ route }: any) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { id } = route.params;
  const animation = useRef(null);

  const html = qutationPdfTemplate();

  const [loading, setLoading] = useState(false);

  const storeDataAsyncStorage = useWriteAscyncStorage();
  const {
    id: temId,
    date,
    customerName,
    buildingBudget,
    advancedPayment,
    mobileNo,
    addressLineOne,
    addressLineTwo,
    additionalNotes,
    buildItems,
    ordereFinished,

    setId,
    setDate,
    setCustomerName,
    setBuildingBudget,
    setAdvancedPayment,
    setMobileNo,
    setAddressLineOne,
    setAddressLineTwo,
    setAdditionalNotes,
    setBuildItems,
  } = useBuildData();

  const toast = useToast();

  const saveAsnycStorage = async (key: string) => {
    const saveStatus = await storeDataAsyncStorage(
      {
        id: temId,
        date,
        customerName,
        buildingBudget,
        advancedPayment,
        mobileNo,
        addressLineOne,
        addressLineTwo,
        additionalNotes,
        buildItems,
        ordereFinished,
      },
      key
    );

    if (saveStatus.status === "failed") {
      return toast.show("Error saving data to databse! Try again", {
        type: "danger",
      });
    }
    return "success";
  };

  const printToPdf = async () => {
    setLoading(true);

    const response = await Print.printToFileAsync({
      html,
    });

    const pdfName = `${response.uri.slice(
      0,
      response.uri.lastIndexOf("/") + 1
    )}invoice_${id}.pdf`;

    await FileSystem.moveAsync({
      from: response.uri,
      to: pdfName,
    });
    setLoading(false);
    await shareAsync(pdfName, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  const [loadingHandleHome, setLoadingHandleHome] = useState(false);

  const handleGoHome = async () => {
    setLoadingHandleHome(true);

    await saveAsnycStorage(STORAGE_KEYS.qutations);

    setId("");
    setDate("");
    setCustomerName("");
    setBuildingBudget(0);
    setAdvancedPayment(0);
    setMobileNo("");
    setAddressLineOne("");
    setAddressLineTwo("");
    setAdditionalNotes("");
    setBuildItems([]);

    setLoadingHandleHome(false);

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "home" }], // Replace 'HomeScreen' with your actual home screen name
      })
    );
  };

  const handleSaveTemplate = async () => {
    setLoadingHandleHome(true);
    const result = await saveAsnycStorage(STORAGE_KEYS.templates);

    if (result === "success") {
      toast.show("Template saved successfully!", {
        type: "success",
      });
    }

    setLoadingHandleHome(false);
  };

  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    animation.current?.play();
    printToPdf();
    // animation.current?.reset();
    // animation.current?.play();
  }, []);

  return (
    <>
      {loadingHandleHome && <Loading message="Loading Operations" />}
      <View style={styles.animationContainer}>
        {loading ? (
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 300,
              height: 300,
              marginLeft: 25,
            }}
            source={require("@/animations/generating.json")}
          />
        ) : (
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 300,
              height: 300,
            }}
            source={require("@/animations/done.json")}
          />
        )}
        {loading ? (
          <Text style={styles.generateText}>Generating Your Quotation</Text>
        ) : (
          <>
            <Text style={styles.generateText}>Quotation Generated.</Text>
            <TouchableOpacity style={styles.goHomeBtn} onPress={handleGoHome}>
              <FontAwesome name="save" size={24} color={Colors.white} />
              <Text style={styles.goHomeBtnText}>Save and go to Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.goHomeBtn}
              onPress={handleSaveTemplate}
            >
              <FontAwesome name="file-text" size={24} color={Colors.white} />
              <Text style={styles.goHomeBtnText}>Save as a template</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.generateAgainBtn}
              onPress={printToPdf}
            >
              <FontAwesome name="gear" size={19} color={Colors.white} />
              <Text style={styles.generateAgainBtnText}>Generate again</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  generateText: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  goHomeBtn: {
    backgroundColor: Colors.buttonBg,
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    elevation: 5,
  },
  goHomeBtnText: {
    color: Colors.white,
    // fontSize: 18,
    fontWeight: "500",
  },
  generateAgainBtn: {
    backgroundColor: Colors.btnGreen,
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    elevation: 5,
  },

  generateAgainBtnText: {
    color: Colors.white,
    // fontSize: 18,
    fontWeight: "500",
  },
});
