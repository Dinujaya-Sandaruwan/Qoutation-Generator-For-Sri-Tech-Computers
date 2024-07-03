import Loading from "@/components/Loading";
import NavSearch from "@/components/NavSearch";
import TemplateItem from "@/components/TemplateItem";
import TemplateDeleteModel from "@/components/models/TemplateDeleteModel";
import Colors from "@/constants/Colors";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import useDeleteAscyncStorage from "@/hooks/asyncStorage/useDeleteAsyncStorageBuilds";
import useReadAscyncStorage from "@/hooks/asyncStorage/useReadAscyncStorage";
import { BuildData } from "@/interfaces/buildData";
import useNavigationStore from "@/zustand/navigationStore";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, StyleSheet, Text } from "react-native";
import { useToast } from "react-native-toast-notifications";

const TemplateScreen = () => {
  const isThisPage = useIsFocused();
  const setPage = useNavigationStore((state) => state.setPage);

  useEffect(() => {
    isThisPage && setPage("templates");
  }, [isThisPage]);

  const readDataAsyncStorage = useReadAscyncStorage();

  const [templates, setTemplates] = useState<BuildData[]>([]);

  const getData = async () => {
    const data = await readDataAsyncStorage(STORAGE_KEYS.templates);
    setTemplates(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const [deleteItemId, setDeleteItemId] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteDataAsyncStorage = useDeleteAscyncStorage();
  const toast = useToast();

  useEffect(() => {
    getData();
  }, [isModalVisible]);

  const handleDelete = async () => {
    const result = await deleteDataAsyncStorage(
      deleteItemId,
      STORAGE_KEYS.templates
    );
    if (result.status === "success") {
      setModalVisible(false);
      return toast.show("Template deleted successfully", {
        type: "success",
      });
    } else {
      setModalVisible(false);
      return toast.show("Failed to delete template", {
        type: "danger",
      });
    }
  };

  const [searchText, setSearchText] = useState("");
  const filteredTemplates = templates?.filter((template) =>
    template?.customerName?.toLowerCase()?.includes(searchText?.toLowerCase())
  );

  return (
    <>
      {loading && (
        <Loading message="Loading New Quotation From Selected Template" />
      )}
      <TemplateDeleteModel
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        handleDelete={handleDelete}
      />
      <NavSearch
        placeholder="Search quotation templates..."
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.title}>Your Saved Templates</Text>
        <FlatList
          data={filteredTemplates}
          renderItem={({ item }) => (
            <TemplateItem
              data={item}
              setDeleteItemId={setDeleteItemId}
              setModalVisible={setModalVisible}
              setLoading={setLoading}
            />
          )}
        />
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 15,
  },
  title: {
    marginTop: 20,
    color: Colors.white,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 30,
  },
});

export default TemplateScreen;
