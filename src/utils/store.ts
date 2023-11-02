// store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import assetsReducer from '../features/assetsSlice';
import userReducer from '../features/userSlice';
import departmentReducer from '../features/departmentSlice';
import labReducer from '../features/labSlice'
import organizationReducer from '../features/organizationSlice'

const rootStore = combineReducers({
  assets: assetsReducer,
  user: userReducer,
  department: departmentReducer,
  lab: labReducer,
  organization: organizationReducer
});

const store = configureStore({
  reducer: rootStore,
});

export default store;
