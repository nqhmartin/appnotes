import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateNotes } from "../redux/noteSlice";
const DetailScreen = ({ navigation, route }) => {
  const item = route.params.item;
  const time = route.params.item.time;
  const index = route.params.index;
  const [title, settitle] = useState(item.title);
  const [content, setcontent] = useState(item.content);
  var dataNotes = useSelector((state) => state.notes);

  const dispatch = useDispatch();
  const handleUpdate = () => {
    const update = { title, content, time };
    const action = updateNotes({ index, update });
    dispatch(action);
    navigation.navigate("Home");
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
        <Text style={styles.headerText}>Detail Notes</Text>

        <TouchableOpacity>
          <Ionicons
            style={styles.headerIcon}
            onPress={handleUpdate}
            name="save-outline"
            size={30}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TextInput
          style={styles.contentInput}
          autoFocus
          placeholder="Title..."
          value={title}
          onChangeText={(e) => settitle(e)}
        />
        <TextInput
          multiline
          placeholder="Content..."
          value={content}
          onChangeText={(e) => setcontent(e)}
        />
      </View>
    </View>
  );
};

export default DetailScreen;

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
