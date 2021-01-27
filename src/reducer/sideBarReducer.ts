import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isSideBarOpen: false,
  isSideBarOpened: false,
  isLogedIn: false,
};
const sideBarSlice = createSlice({
  name: "sideBar",
  initialState,
  reducers: {
    openSideBar(state) {
      state.isSideBarOpen = true;
    },
    showSideBar(state) {
      state.isSideBarOpened = true;
    },
    hideSideBar(state) {
      state.isSideBarOpened = false;
    },
    closeSideBar(state) {
      state.isSideBarOpen = false;
    },
  },
});
export const {
  openSideBar,
  showSideBar,
  hideSideBar,
  closeSideBar,
} = sideBarSlice.actions;
export default sideBarSlice.reducer;
