import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteNotes, getNotes, createNotes } from "../redux/noteSlice";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const App = ({ navigation }) => {
  useEffect(() => {
    AsyncStorage.getItem("notes")
      .then((result) => {
        const getData = JSON.parse(result);
        getData.map((e) => {
          const action = createNotes(e);
          dispatch(action);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const dispatch = useDispatch();
  const dataNotes = useSelector((state) => state.notes);
  const renderItem = ({ item, index }) => {
    const handleDelete = () => {
      Alert.alert("", "Do you want to delete this note?", [
        {
          text: "Cannel",
          onPress: () => console.log("Cancel"),
        },
        {
          text: "Delete",
          onPress: () => {
            const action = deleteNotes(index);
            dispatch(action);
          },
        },
      ]);
    };

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Detail", { item, index })}
        style={styles.item}
      >
        <Text numberOfLines={1} style={styles.itemTitle}>
          {item.title}
        </Text>
        <Text style={styles.itemCreatedAt}>{item.time}</Text>
        <Text numberOfLines={5} style={styles.itemContent}>
          {item.content}
        </Text>
        <TouchableOpacity style={styles.itemDelete} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={26} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#F7F7F7"} barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>NOTES</Text>
        {/* <View style={styles.headerSearch}>
          <TextInput
            style={styles.headerSearchInput}
            placeholder="Search notes"
          />
          <TouchableOpacity style={styles.btnSearch}
          onPress={handleSearch}>
            <Image
              source={require("../../assets/search.png")}
              style={styles.searchImg}
            />
          </TouchableOpacity>
        </View> */}
      </View>

      <View style={styles.content}>
        {dataNotes.length > 0 ? (
          <FlatList
            data={dataNotes}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View style={styles.notNote}>
            <Image
              source={require("../../assets/prohibition.png")}
              resizeMode="center"
              style={styles.imgNot}
            />
            <Text style={styles.notNoteText}>No note yet!!!</Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.btnCreate}
        onPress={() => {
          navigation.navigate("Create");
        }}
      >
        <Text style={styles.btnCreateText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },

  header: {
    margin: 10,
  },

  headerText: {
    fontSize: 20,
    color: "#EEBD45",
    fontWeight: "bold",
    textAlign: "center",
    fontStyle: "italic",
  },
  headerSearch: {
    margin: 15,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#ECECEC",
    flexDirection: "row",
  },
  headerSearchInput: {
    width: "90%",
    paddingLeft: 10,
  },
  btnSearch: {
    justifyContent: "center",
  },
  searchImg: {
    height: 25,
    width: 25,
    alignSelf: "center",
    opacity: 0.7,
  },
  content: {
    justifyContent: "space-between",
    padding: 10,
    flex: 1,
    paddingBottom: 10,
  },
  item: {
    width: "48%",
    backgroundColor: "white",
    height: 180,
    borderRadius: 10,
    margin: 5,
    padding: 5,
  },
  itemTitle: {
    color: "#EEBD45",
    fontSize: 16,
    marginBottom: 2,
  },
  itemCreatedAt: {
    fontStyle: "italic",
    marginBottom: 2,
    opacity: 0.8,
  },
  itemContent: {},
  itemDelete: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  btnCreate: {
    width: 60,
    height: 60,
    backgroundColor: "#EEBD45",
    position: "absolute",
    bottom: 20,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  btnCreateText: {
    fontSize: 40,
    color: "white",
  },
  notNote: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  imgNot: {
    width: 100,
    height: 100,
  },
  notNoteText: {
    marginTop: 5,
    fontSize: 16,
    fontStyle: "italic",
    color: "#EEBD45",
  },
});
