import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const slide = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    getNotes: (state, action) => {
      state = action.payload;
    },
    createNotes: (state, action) => {
      state.push(action.payload);
      AsyncStorage.setItem("notes", JSON.stringify(state));
    },
    deleteNotes: (state, action) => {
      state.splice(action.payload, 1);

      AsyncStorage.setItem("notes", JSON.stringify(state));
    },
    updateNotes: (state, action) => {
      state.splice(action.payload.index, 1, action.payload.update);
      AsyncStorage.setItem("notes", JSON.stringify(state));
    },
  },
});

const { reducer, actions } = slide;
export const { createNotes, deleteNotes, getNotes, updateNotes } = actions;
export default reducer;
