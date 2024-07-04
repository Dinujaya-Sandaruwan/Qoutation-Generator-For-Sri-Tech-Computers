import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Modal from "react-native-modal";

import Colors from "@/constants/Colors";

interface Props {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
}

const ProductDeleteModel = ({
  isModalVisible,
  setModalVisible,
  handleDelete,
}: Props) => {
  return (
    <Modal isVisible={isModalVisible} backdropOpacity={0}>
      <View style={styles.modelContainer}>
        <Text style={styles.modellabel}>
          Do you want to delete this product category permanently?
        </Text>
        <Text style={styles.warningText}>
          <Text style={{ fontWeight: "900" }}>Warning:</Text> This action will
          delete every item inside this product category from your local
          storage.
        </Text>

        <View style={styles.modelbtnContainer}>
          <TouchableOpacity
            style={styles.modelButtons}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modelBtnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modelButtons, { backgroundColor: Colors.red }]}
            onPress={handleDelete}
          >
            <Text style={styles.modelBtnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ProductDeleteModel;

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
    marginBottom: 10,
  },
  warningText: {
    color: Colors.btnYellow,
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
});
