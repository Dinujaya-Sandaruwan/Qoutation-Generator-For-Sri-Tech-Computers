import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { BuildData, BuildItem } from "@/interfaces/buildData";
import useFormatMoney from "@/hooks/useFormatMoney";
import usePhoneNumberFormatter from "@/hooks/usePhoneNumberFormatter";
import useDeleteAscyncStorage from "@/hooks/asyncStorage/useDeleteAsyncStorageBuilds";
import { useToast } from "react-native-toast-notifications";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import { RootStackParamList } from "@/types/navigation";
import {
  useNavigation,
  NavigationProp,
  CommonActions,
} from "@react-navigation/native";
import QuotationDeleteModel from "@/components/models/QuotationDeleteModel";
import Loading from "@/components/Loading";
import useBuildData from "@/zustand/buildDataStore";
import useAddBuildDataToFirebase from "@/hooks/firebase/useAddBuildsToFirebase";
import { DATABASE_ID } from "@/constants/databaseCollections";
import useDeleteBuildDataFromFirebase from "@/hooks/firebase/useDeleteBuildDataFromFirebase";

interface Route {
  key: string;
  name: string;
  params: BuildData;
}

const CompletdOrderInfoScreen = ({ route }: any) => {
  const data = route.params.item;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const formatMoney = useFormatMoney();
  const formattedNumber = usePhoneNumberFormatter(data.mobileNo);
  const mobileNumber = formattedNumber ? formattedNumber : "N/A";
  const address =
    [data.addressLineOne || "", data.addressLineTwo || ""]
      .filter((line) => line.trim() !== "")
      .join(", ") || "N/A";

  const formatWarranty = (warranty: number, type: string) => {
    if (!warranty) return "N/A";

    if (warranty > 1 && type === "months") {
      return `${warranty} months`;
    } else if (warranty === 1 && type === "months") {
      return `${warranty} month`;
    } else if (warranty > 1 && type === "years") {
      return `${warranty} years`;
    } else if (warranty === 1 && type === "years") {
      return `${warranty} year`;
    }
  };

  const toast = useToast();
  const [isModalVisible, setModalVisible] = React.useState(false);
  const { deleteBuildDataFromFirebase, loading, error } =
    useDeleteBuildDataFromFirebase();

  const handleDelete = async () => {
    setModalVisible(false);
    console.log(data.id, DATABASE_ID.qutations);
    const result = await deleteBuildDataFromFirebase(
      data.id,
      DATABASE_ID.qutations
    );
    if (result.success) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "completedOrders" }],
        })
      );
      return toast.show("Order Deleted Successfully", {
        type: "success",
      });
    } else {
      return toast.show("Error while deleting the order", {
        type: "danger",
      });
    }
  };

  return (
    <>
      {loading && (
        <Loading message="Deleting Selected Order From Cloud Server" />
      )}
      <QuotationDeleteModel
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        handleDelete={handleDelete}
      />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Order Actions (Cloud)</Text>
        <Text style={styles.orderId}>#{data.id}</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[styles.button, { backgroundColor: Colors.red }]}
        >
          <MaterialIcons name="delete" size={24} color={Colors.white} />
          <Text style={styles.btnText}>Delete this order from DB</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Order Details</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Order ID</Text>
          <Text style={styles.infoText}>{data?.id ? data?.id : "N/A"}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Order Date</Text>
          <Text style={styles.infoText}>{data?.date ? data?.date : "N/A"}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Customer Name</Text>
          <Text style={styles.infoText}>
            {data?.customerName ? data?.customerName : "N/A"}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Order Budget</Text>
          <Text style={styles.infoText}>
            {data?.buildingBudget ? data?.buildingBudget : "N/A"}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Advancde Payment</Text>
          <Text style={styles.infoText}>
            {data?.advancedPayment ? formatMoney(data?.advancedPayment) : "N/A"}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Mobile Number</Text>
          <Text style={styles.infoText}>{mobileNumber}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Address</Text>
          <Text style={styles.infoText}>{address}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Additional Notes</Text>
          <Text style={styles.infoText}>
            {data?.additionalNotes ? data?.additionalNotes : "N/A"}
          </Text>
        </View>
        <Text style={styles.title}>Order Items</Text>
        {data.buildItems.map((item: BuildItem, index: number) => (
          <View key={index} style={styles.infoContainer}>
            <Text style={styles.infoTitle}>{item.itemName}</Text>
            <Text style={[styles.infoText, { lineHeight: 25 }]}>
              Price: {formatMoney(item?.itemPrice)} x {item?.itemQuantity} ={" "}
              {formatMoney(item?.itemPrice * item?.itemQuantity)} {"\n"}
              {`Warranty: ${formatWarranty(
                item.itemWarranty,
                item.itemWarrantyType
              )}`}
            </Text>
          </View>
        ))}
        <View style={{ height: 50 }} />
      </ScrollView>
    </>
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
    fontSize: 26,
    marginBottom: 15,
    paddingTop: 25,
  },
  orderId: {
    color: Colors.border,
    fontWeight: "700",
    fontSize: 12,
    marginTop: -12,
    marginBottom: 20,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 20,
    width: "100%",
    marginTop: 10,
  },
  btnText: {
    color: Colors.white,
    fontSize: 16,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: Colors.buttonBg,
    borderBlockColor: Colors.componentBorder,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    paddingHorizontal: "14%",

    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  completeButton: {
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 5,
    borderBlockColor: Colors.componentBorder,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    paddingHorizontal: "12%",

    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.btnGreen,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoTitle: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10,
  },
  infoText: {
    color: Colors.border,
    fontWeight: "400",
    fontSize: 15,
    backgroundColor: Colors.componentBg,
    padding: 12,
    borderRadius: 10,
  },
});

export default CompletdOrderInfoScreen;
