import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { TextInput } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import Entypo from "@expo/vector-icons/Entypo";
import { RadioButton } from "react-native-paper";

import Colors from "@/constants/Colors";
import useBuildData from "@/zustand/buildDataStore";
import { RootStackParamList } from "@/types/navigation";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";

interface Props {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  itemId: string;
  itemName: string;
}

const PriceModel = ({
  isModalVisible,
  setModalVisible,
  itemId,
  itemName,
}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const toast = useToast();

  const [price, setprice] = useState<number | null>(null);
  const [warranty, setWarranty] = useState<number>(0);
  const [warrantyDuration, setWarrantyDuration] = useState("months");
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddPrice = () => setprice(price && price + 50);
  const handleSubPrice = () => setprice(price && price - 50);
  const handleAddWarranty = () => setWarranty(warranty + 1);
  const handleSubWarranty = () => warranty >= 1 && setWarranty(warranty - 1);
  const handleAddQuantity = () => setQuantity(quantity + 1);
  const handleSubQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  const {
    setItemPrice,
    setItemWarranty,
    setItemWarrantyType,
    setItemName,
    setItemQuantity,
  } = useBuildData();

  const handleaddDetails = () => {
    if (!price) {
      toast.show("You can't have an item without a price.", {
        type: "warning",
      });
      return;
    }

    if (price) {
      setItemPrice(itemId, price);
    }
    if (warranty) {
      setItemWarranty(itemId, warranty);
    } else {
      setItemWarranty(itemId, 0);
    }
    if (warrantyDuration) {
      setItemWarrantyType(itemId, warrantyDuration);
    } else {
      setItemWarrantyType(itemId, "");
    }
    if (quantity) {
      setItemQuantity(itemId, quantity);
    } else {
      setItemQuantity(itemId, 1);
    }
    setItemName(itemId, itemName);
    setModalVisible(false);
    navigation.goBack();
  };

  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.modelContainer}>
        <Text style={styles.modellabel}>Enter item price</Text>

        <View style={styles.priceInputContainer}>
          <TouchableOpacity
            style={styles.priceInputBtn}
            onPress={handleSubPrice}
          >
            <Entypo name="minus" size={24} color={Colors.white} />
          </TouchableOpacity>
          <TextInput
            keyboardType="numeric"
            style={styles.priceInput}
            value={price ? price.toString() : ""}
            onChange={(e) => {
              setprice(parseInt(e.nativeEvent.text));
            }}
          ></TextInput>
          <TouchableOpacity
            style={styles.priceInputBtn}
            onPress={handleAddPrice}
          >
            <Entypo name="plus" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>

        <Text style={styles.modellabel}>Enter warranty period</Text>
        <View style={styles.priceInputContainer}>
          <TouchableOpacity
            style={styles.priceInputBtn}
            onPress={handleSubWarranty}
          >
            <Entypo name="minus" size={24} color={Colors.white} />
          </TouchableOpacity>
          <TextInput
            keyboardType="numeric"
            style={styles.priceInput}
            value={warranty ? warranty.toString() : ""}
            onChange={(e) => {
              setWarranty(parseInt(e.nativeEvent.text));
            }}
          ></TextInput>
          <TouchableOpacity
            style={styles.priceInputBtn}
            onPress={handleAddWarranty}
          >
            <Entypo name="plus" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.radioGroup}>
          <View style={styles.radioButton}>
            <RadioButton.Android
              value="months"
              status={warrantyDuration === "months" ? "checked" : "unchecked"}
              onPress={() => setWarrantyDuration("months")}
              color={Colors.white}
            />
            <Text style={styles.radioLabel}>Months</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton.Android
              value="years"
              status={warrantyDuration === "years" ? "checked" : "unchecked"}
              onPress={() => setWarrantyDuration("years")}
              color={Colors.white}
            />
            <Text style={styles.radioLabel}>Years</Text>
          </View>
        </View>
        <Text style={styles.modellabel}>Enter the quantity</Text>
        <View style={styles.priceInputContainer}>
          <TouchableOpacity
            style={styles.priceInputBtn}
            onPress={handleSubQuantity}
          >
            <Entypo name="minus" size={24} color={Colors.white} />
          </TouchableOpacity>
          <TextInput
            keyboardType="numeric"
            style={styles.priceInput}
            value={quantity ? quantity.toString() : ""}
            onChange={(e) => {
              setWarranty(parseInt(e.nativeEvent.text));
            }}
          ></TextInput>
          <TouchableOpacity
            style={styles.priceInputBtn}
            onPress={handleAddQuantity}
          >
            <Entypo name="plus" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.modelButtons}
          onPress={handleaddDetails}
        >
          <Text style={styles.modelBtnText}>Add details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modelButtons, { backgroundColor: Colors.red }]}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.modelBtnText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default PriceModel;

const styles = StyleSheet.create({
  modelContainer: {
    backgroundColor: Colors.darkBg,

    borderRadius: 10,
    elevation: 5,
    padding: 20,
  },
  modelCloseBtn: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modellabel: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 18,
  },
  priceInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  priceInputBtn: {
    width: 50,
    height: 50,
    backgroundColor: Colors.buttonBg,
    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",
  },
  priceInput: {
    width: 200,
    height: 50,
    backgroundColor: Colors.componentBg,
    borderRadius: 10,
    color: Colors.white,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginEnd: 20,
  },
  radioGroup: {
    flexDirection: "row",
    marginBottom: 20,
  },
  radioLabel: {
    color: Colors.white,
    fontSize: 16,
    marginLeft: 10,
  },
  modelButtons: {
    backgroundColor: Colors.buttonBg,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    elevation: 5,
    borderBlockColor: Colors.componentBorder,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
  },
  modelBtnText: {
    color: Colors.white,
  },
});
