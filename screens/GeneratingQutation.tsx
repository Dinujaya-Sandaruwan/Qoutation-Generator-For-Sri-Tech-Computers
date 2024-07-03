import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

import Loading from "@/components/Loading";
import Colors from "@/constants/Colors";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import useWriteAscyncStorage from "@/hooks/asyncStorage/useWriteAscyncStorageBuildItems";
import qutationPdfTemplate from "@/templates/qutationPdfTemplate";
import { RootStackParamList } from "@/types/navigation";
import useBuildData from "@/zustand/buildDataStore";
import LottieView from "lottie-react-native";
import { useToast } from "react-native-toast-notifications";

export default function GeneratingQutation({ route }: any) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { id } = route?.params;
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
  const [loadingHandleHome, setLoadingHandleHome] = useState(false);

  const saveAsnycStorage = async (key: string) => {
    try {
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
        toast.show("Error saving data to database! Try again", {
          type: "danger",
        });
        return "failed";
      }
      return "success";
    } catch (error) {
      toast.show("An unexpected error occurred!", {
        type: "danger",
      });
      return "failed";
    }
  };

  const calculateHeight = () => {
    let height = 805;

    if (!buildItems) return height;

    buildItems?.forEach((item) => {
      height += 26.9775;
    });
    return height;
  };

  const printToPdf = async () => {
    setLoading(true);
    try {
      const response = await Print.printToFileAsync({
        html,
        width: 612,
        height: calculateHeight(),
      });
      const pdfName = `${response.uri.slice(
        0,
        response.uri.lastIndexOf("/") + 1
      )}invoice_${id}.pdf`;

      await FileSystem.moveAsync({ from: response.uri, to: pdfName });
      await shareAsync(pdfName, { UTI: ".pdf", mimeType: "application/pdf" });
    } catch (error) {
      toast.show("Failed to generate PDF!", { type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoHome = async () => {
    setLoadingHandleHome(true);
    const result = await saveAsnycStorage(STORAGE_KEYS.qutations);

    if (result === "success") {
      // setId("");
      // setDate("");
      // setCustomerName("");
      // setBuildingBudget(0);
      // setAdvancedPayment(0);
      // setMobileNo("");
      // setAddressLineOne("");
      // setAddressLineTwo("");
      // setAdditionalNotes("");
      // setBuildItems([]);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "home" }],
        })
      );
    }

    setLoadingHandleHome(false);
  };

  const handleSaveTemplate = async () => {
    setLoadingHandleHome(true);
    const result = await saveAsnycStorage(STORAGE_KEYS.templates);

    if (result === "success") {
      toast.show("Template saved successfully!", {
        type: "success",
      });
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "home" }],
        })
      );
    } else {
      toast.show("Failed to save template!", {
        type: "danger",
      });
    }

    setLoadingHandleHome(false);
  };

  useEffect(() => {
    animation.current?.play();
    printToPdf();
  }, []);

  return (
    <>
      {loadingHandleHome && <Loading message="Loading Operations" />}
      <View style={styles.animationContainer}>
        {loading ? (
          <LottieView
            autoPlay
            ref={animation}
            style={{ width: 300, height: 300, marginLeft: 25 }}
            source={require("@/animations/generating.json")}
          />
        ) : (
          <LottieView
            autoPlay
            ref={animation}
            style={{ width: 300, height: 300 }}
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
