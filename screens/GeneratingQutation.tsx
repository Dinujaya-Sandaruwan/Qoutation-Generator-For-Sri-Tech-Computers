import React, { useRef, useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";

import LottieView from "lottie-react-native";
import Colors from "@/constants/Colors";
import qutationPdfTemplate from "@/templates/qutationPdfTemplate";

export default function GeneratingQutation({ route }: any) {
  const { id } = route.params;
  const animation = useRef(null);

  const html = qutationPdfTemplate();

  const [loading, setLoading] = useState(false);

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

  const handleGoHome = () => {
    // navigation.navigate("home");
  };

  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    animation.current?.play();
    printToPdf();
    // animation.current?.reset();
    // animation.current?.play();
  }, []);

  return (
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
            style={styles.generateAgainBtn}
            onPress={printToPdf}
          >
            <FontAwesome name="gear" size={19} color={Colors.white} />
            <Text style={styles.generateAgainBtnText}>Generate again</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
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
  },
  goHomeBtn: {
    backgroundColor: Colors.buttonBg,
    padding: 15,
    borderRadius: 5,
    marginTop: 30,
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
