import NavSearch from "@/components/NavSearch";
import SavedQutationItem from "@/components/SavedQutationItem";
import Colors from "@/constants/Colors";
import { RootStackParamList } from "@/types/navigation";
import { AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <>
      <NavSearch />
      <KeyboardAvoidingView style={styles.container}>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          ListHeaderComponent={() => (
            <Text style={styles.title}>Saved Qutations</Text>
          )}
          renderItem={() => <SavedQutationItem />}
          ListFooterComponent={() => <View style={{ height: 55 }} />}
          ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={5}
        />
      </KeyboardAvoidingView>
      <View style={styles.footer}>
        <TouchableHighlight
          style={styles.createBtn}
          onPress={() => navigation.navigate("profile")}
          underlayColor={Colors.border}
        >
          <AntDesign name="plus" size={50} color={Colors.white} />
        </TouchableHighlight>
      </View>
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: Colors.background,
  },
  title: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 24,
    marginBottom: 20,
    paddingTop: 25,
  },
  createBtn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.componentBg,
    marginTop: -50,
    borderWidth: 8,
    borderColor: Colors.background,

    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    height: 63,
    backgroundColor: "#151515",
    alignItems: "center",
  },
});
