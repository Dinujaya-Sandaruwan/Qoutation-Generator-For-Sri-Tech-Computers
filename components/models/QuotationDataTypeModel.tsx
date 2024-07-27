import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Modal from "react-native-modal";

import Colors from "@/constants/Colors";
import quotationDataTypeStore from "@/zustand/quotationDataTypeStore";

interface Props {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  callBack?: () => void;
}

const QuotationDataTypeModel = ({
  isModalVisible,
  setModalVisible,
  callBack,
}: Props) => {
  const { setQuotationDataType } = quotationDataTypeStore();
  return (
    <Modal
      isVisible={isModalVisible}
      backdropTransitionOutTiming={0}
      onBackdropPress={() => setModalVisible(false)}
    >
      <View style={styles.modelContainer}>
        <Text style={styles.modellabel}>Select Quotation Type</Text>
        <TouchableOpacity
          style={styles.modelButtons}
          onPress={() => {
            setQuotationDataType("Minimal");
            setModalVisible(false);
          }}
        >
          <Text style={styles.modelBtnText}>Minimal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modelButtons}
          onPress={() => {
            setQuotationDataType("With Blanks");
            setModalVisible(false);
          }}
        >
          <Text style={styles.modelBtnText}>With Blanks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modelButtons}
          onPress={() => {
            setQuotationDataType("Full Details");
            setModalVisible(false);
          }}
        >
          <Text style={styles.modelBtnText}>Full Details</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default QuotationDataTypeModel;

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
    marginBottom: 10,
    elevation: 5,
  },
  modelBtnText: {
    color: Colors.white,
  },
  closeText: {
    color: Colors.border,
    textAlign: "center",
    // marginTop: 20,
  },
});
