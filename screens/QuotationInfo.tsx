import Loading from "@/components/Loading";
import QuotationDeleteModel from "@/components/models/QuotationDeleteModel";
import Colors from "@/constants/Colors";
import { DATABASE_ID } from "@/constants/databaseCollections";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import useDeleteAscyncStorage from "@/hooks/asyncStorage/useDeleteAsyncStorageBuilds";
import useAddBuildDataToFirebase from "@/hooks/firebase/useAddBuildsToFirebase";
import useCheckInternetConnection from "@/hooks/useCheckInternetConnection";
import useFormatMoney from "@/hooks/useFormatMoney";
import { BuildData, BuildItem } from "@/interfaces/buildData";
import { RootStackParamList } from "@/types/navigation";
import useBuildData from "@/zustand/buildDataStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useToast } from "react-native-toast-notifications";

interface Route {
  key: string;
  name: string;
  params: BuildData;
}

const QuotationInfo = ({ route }: any) => {
  const data = route?.params?.item;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [loading, setLoading] = React.useState(false);

  const formatMoney = useFormatMoney();
  const mobileNumber = data?.mobileNo ? data?.mobileNo : "N/A";
  const address =
    [data.addressLineOne || "", data?.addressLineTwo || ""]
      ?.filter((line) => line?.trim() !== "")
      ?.join(", ") || "N/A";

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

  const deleteDataAsyncStorage = useDeleteAscyncStorage();
  const toast = useToast();
  const [isModalVisible, setModalVisible] = React.useState(false);

  const handleDelereQuotation = async () => {
    setLoading(true);
    const result = await deleteDataAsyncStorage(
      data.id,
      STORAGE_KEYS.qutations
    );

    if (result.status === "success") {
      setLoading(false);
      setModalVisible(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "home" }],
        })
      );
    } else {
      setLoading(false);
      return toast.show("Something went wrong. Try again.", {
        type: "warning",
      });
    }
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

  const handleEditQuotation = () => {
    setLoading(true);
    setId(data?.id);
    setDate(data?.date);
    setCustomerName(data?.customerName);
    setBuildingBudget(data?.buildingBudget);
    setAdvancedPayment(data?.advancedPayment);
    setMobileNo(data?.mobileNo);
    setAddressLineOne(data?.addressLineOne);
    setAddressLineTwo(data?.addressLineTwo);
    setAdditionalNotes(data?.additionalNotes);
    setBuildItems(data?.buildItems);
    setLoading(false);
    navigation.navigate("createPage01");
  };

  const {
    addBuildDataToFirebase,
    loading: firebaseLoading,
    error,
  } = useAddBuildDataToFirebase();

  const checkInternetConnection = useCheckInternetConnection();
  const [checkingInternet, setCheckingInternet] = React.useState(false);

  const handleComplete = async () => {
    setCheckingInternet(true);
    const result = await checkInternetConnection();
    setCheckingInternet(false);
    if (result.status !== "ok") {
      return;
    }
    await addBuildDataToFirebase(data, DATABASE_ID.qutations);
    if (error) {
      return toast.show("Something went wrong. Try again.", {
        type: "warning",
      });
    }

    await handleDelereQuotation();

    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{ name: "home" }],
    //   })
    // );
  };

  return (
    <>
      {checkingInternet && <Loading message="Checking Internet Connection" />}
      {loading && <Loading message="Order Data Loading" />}
      {firebaseLoading && (
        <Loading message="Marking Selected Order as Complete" />
      )}
      <QuotationDeleteModel
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        handleDelete={handleDelereQuotation}
      />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Order Actions</Text>
        <Text style={styles.orderId}>#{data?.id}</Text>
        <TouchableOpacity
          onPress={handleComplete}
          style={[styles.completeButton]}
        >
          <FontAwesome name="check-square" size={24} color={Colors.white} />
          <Text style={styles.btnText}>Mark as complete</Text>
        </TouchableOpacity>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={handleEditQuotation}
            style={[styles.button]}
          >
            <Text style={styles.btnText}>Edit quotation</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={[styles.button]}
          >
            <Text style={styles.btnText}>Delete quotation</Text>
          </TouchableOpacity>
        </View>

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
            <Text style={styles.infoTitle}>{item?.itemName}</Text>
            <Text style={[styles.infoText, { lineHeight: 25 }]}>
              Price: {formatMoney(item?.itemPrice)} x {item?.itemQuantity} ={" "}
              {formatMoney(item?.itemPrice * item?.itemQuantity)} {"\n"}
              {`Warranty: ${formatWarranty(
                item?.itemWarranty,
                item?.itemWarrantyType
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
    marginTop: 20,
  },
  btnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    borderRadius: 10,
    elevation: 5,
    backgroundColor: Colors.buttonBg,
    borderBlockColor: Colors.componentBorder,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 15,
    marginTop: 10,

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

export default QuotationInfo;
