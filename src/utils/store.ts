// store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import assetsReducer from '../features/assetsSlice';
import userReducer from '../features/userSlice';
import departmentReducer from '../features/departmentSlice';
import labReducer from '../features/labSlice';
import organizationReducer from '../features/organizationSlice';
import notificationReducer from '../features/notificationSlice';
import runsReducer from '../features/runsSlice';
import { chartTableReducer } from '../features/runsSlice';
import procedureReducer from '../features/procedureSlice';
import roleReducer from '../features/roleSlice';
import userRunsSlice from '../features/userRunsSlice';
import loginUserSlice from "../features/loginUserSlice"

const rootStore = combineReducers({
  assets: assetsReducer,
  user: userReducer,
  department: departmentReducer,
  lab: labReducer,
  organization: organizationReducer,
  notification: notificationReducer,
  procedure: procedureReducer,
  role: roleReducer,
  runs: runsReducer,
  tableChart: chartTableReducer,
  userRuns: userRunsSlice,
  userLogin: loginUserSlice
});

const store = configureStore({
  reducer: rootStore,
});

export default store;
