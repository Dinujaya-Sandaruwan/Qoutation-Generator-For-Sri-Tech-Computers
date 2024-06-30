import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { TextInput } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import { RadioButton } from "react-native-paper";

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
    <Modal isVisible={isModalVisible}>
      <View style={styles.modelContainer}>
        <Text style={styles.modellabel}>
          Do you want to delete this item permanently?
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
