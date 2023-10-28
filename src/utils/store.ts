// store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import assetsReducer from '../features/assetsSlice'; // Import your reducers
import userReducer from '../features/userSlice'; // Import your reducers

const rootStore = combineReducers({
  assets: assetsReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootStore,
});

export default store;
