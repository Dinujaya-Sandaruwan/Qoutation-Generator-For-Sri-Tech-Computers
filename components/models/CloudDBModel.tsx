import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Modal from "react-native-modal";

import Colors from "@/constants/Colors";

interface Props {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  callBack: () => void;
  title: string;
  warning: string;
  warningType: "red" | "yellow";
}

const CloudDBModel = ({
  isModalVisible,
  setModalVisible,
  callBack,
  title,
  warning,
  warningType = "yellow",
}: Props) => {
  return (
    <Modal isVisible={isModalVisible} backdropTransitionOutTiming={0}>
      <View style={styles.modelContainer}>
        <Text style={styles.modellabel}>{title}</Text>
        <Text
          style={[
            styles.warningText,
            { color: warningType === "red" ? Colors.red : Colors.btnYellow },
          ]}
        >
          <Text style={{ fontWeight: "900" }}>Important:</Text> {warning}
        </Text>

        <View style={styles.modelbtnContainer}>
          <TouchableOpacity
            style={styles.modelButtons}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modelBtnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modelButtons, { backgroundColor: Colors.btnGreen }]}
            onPress={() => {
              callBack();
              setModalVisible(false);
            }}
          >
            <Text style={styles.modelBtnText}>Do it</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CloudDBModel;

const styles = StyleSheet.create({
  modelContainer: {
    backgroundColor: Colors.darkBg,

    borderRadius: 10,
    elevation: 5,
    padding: 20,
  },

  modellabel: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 20,
  },
  modelbtnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modelButtons: {
    backgroundColor: Colors.buttonBg,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    elevation: 5,

    marginBottom: 10,
    width: "44%",
  },
  modelBtnText: {
    color: Colors.white,
  },
  warningText: {
    // color: Colors.btnYellow,
    marginBottom: 20,
  },
});
