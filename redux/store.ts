import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiService } from "@/services/apiService"; // Ensure this is properly set up
import appSlice from "./features/appSlice";

// Combine all reducers
const rootReducer = combineReducers({
  [apiService.reducerPath]: apiService.reducer,
  app: appSlice,
});

// Configure the store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware), // Ensure this is valid
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
