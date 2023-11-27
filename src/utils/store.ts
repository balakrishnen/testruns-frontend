import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
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
import fileUploadReducer from '../features/fileUploadSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
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
  fileUpload: fileUploadReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export default store;
