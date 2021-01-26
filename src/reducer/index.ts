import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import musicSearchReducer from "./musicSearchReducer";
const rootReducer = combineReducers({
  musicSearch: musicSearchReducer,
});
const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
