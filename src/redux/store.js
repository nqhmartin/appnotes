import {configureStore} from '@reduxjs/toolkit';
import noteSlice from './noteSlice';
const rootReducer = {
  notes: noteSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
