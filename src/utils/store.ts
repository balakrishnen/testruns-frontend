// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../features/assetsSlice'; // Import your reducers

const store = configureStore({
  reducer: rootReducer,
});

export default store;