import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { errorLogger } from "../middlewares/error";
import { apiService } from "@/services/apiService";
import appSlice from "./features/appSlice";

const rootReducer = combineReducers({
  [apiService.reducerPath]: apiService.reducer,
  app: appSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
