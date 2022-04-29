import { View, Text } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getNotes } from "../redux/noteSlice";
import { useDispatch } from "react-redux";
export default function LoadingScreen({ navigation }) {
  const dispatch = useDispatch();
  useEffect(async () => {
    const value = await AsyncStorage.getItem("notes");
    const data = JSON.parse(value);
    const action = getNotes(data);
    dispatch(action);
    console.log(action);
    navigation.navigate("Home");
  }, []);
  return (
    <View>
      <Text>LoadingScreen</Text>
    </View>
  );
}
