import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import footerReducer from "./footerReducer";
import musicSearchReducer from "./musicSearchReducer";
import sideBarReducer from "./sideBarReducer";

const rootReducer = combineReducers({
  musicSearch: musicSearchReducer,
  sideBar: sideBarReducer,
  footer: footerReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
