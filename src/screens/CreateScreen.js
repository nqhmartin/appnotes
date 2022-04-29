import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { createNotes } from "../redux/noteSlice";
const CreateScreen = ({ navigation }) => {
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");

  const dispatch = useDispatch();
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + "-" + month + "-" + year; //format: dd-mm-yyyy;
  };
  const time = getCurrentDate();

  const handleCreate = () => {
    if (title && content) {
      const action = createNotes({ title, content, time });
      dispatch(action);
      navigation.navigate("Home");
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"white"} barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            style={styles.headerIcon}
            name="arrow-back-outline"
            size={33}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Create Notes</Text>

        <TouchableOpacity onPress={handleCreate}>
          <Ionicons
            style={styles.headerIcon}
            name="checkmark-outline"
            size={30}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TextInput
          style={styles.contentInput}
          autoFocus
          placeholder="Title..."
          onChangeText={(e) => settitle(e)}
        />
        <TextInput
          multiline
          placeholder="Content to note..."
          onChangeText={(e) => setcontent(e)}
        />
      </View>
    </View>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: "center",
  },
  headerText: {
    color: "#EEBD45",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  headerIcon: {
    color: "#EEBD45",
  },
  content: {
    margin: 20,
  },
  contentInput: {
    color: "#EEBD45",
    fontSize: 18,
  },
});
