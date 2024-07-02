import Entypo from "@expo/vector-icons/Entypo";
import React, { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";

import Colors from "@/constants/Colors";

import { BuildData } from "@/interfaces/buildData";
import { RootStackParamList } from "@/types/navigation";
import useBuildData from "@/zustand/buildDataStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

type TemplateItemProps = {
  data: BuildData;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteItemId: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const TemplateItem = (props: TemplateItemProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

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
    setBuildItems,
  } = useBuildData();

  const handleCreateNewQuotation = () => {
    props.setLoading(true);
    setId("");
    setDate("");
    setCustomerName("");
    setBuildingBudget(0);
    setAdvancedPayment(0);
    setMobileNo("");
    setAddressLineOne("");
    setAddressLineTwo("");

    setBuildItems(props?.data?.buildItems);
    setAdditionalNotes(props?.data?.additionalNotes);
    props.setLoading(false);
    navigation.navigate("createPage01");
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.flatlistItemContainer}
        onLongPress={() => {
          props.setModalVisible(true);
          props.setDeleteItemId(props?.data?.id);
        }}
      >
        <Text style={styles.flatlistItelabel}>{props?.data?.customerName}</Text>
        <TouchableOpacity
          onPress={handleCreateNewQuotation}
          style={styles.creatBtn}
        >
          <Entypo name="chevron-right" size={24} color={Colors.white} />
        </TouchableOpacity>
      </Pressable>
    </Animated.View>
  );
};

export default TemplateItem;

const styles = StyleSheet.create({
  flatlistItemContainer: {
    padding: 20,
    backgroundColor: Colors.darkBg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.componentBorder,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 5,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flatlistItelabel: {
    color: Colors.white,
    fontWeight: "700",
  },
  creatBtn: {
    paddingLeft: 20,
  },
});
