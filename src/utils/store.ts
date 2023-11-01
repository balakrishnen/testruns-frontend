// store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import assetsReducer from '../features/assetsSlice';
import userReducer from '../features/userSlice';
import departmentReducer from '../features/departmentSlice';


const rootStore = combineReducers({
  assets: assetsReducer,
  user: userReducer,
  department: departmentReducer
});

const store = configureStore({
  reducer: rootStore,
});

export default store;
