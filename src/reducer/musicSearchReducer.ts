import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSearchOpen: false,
};
const musicSearchSlice = createSlice({
  name: "musicSearch",
  initialState,
  reducers: {
    openSearch(state) {
      state.isSearchOpen = true;
    },
    closeSearch(state) {
      state.isSearchOpen = false;
    },
  },
});
export const { openSearch, closeSearch } = musicSearchSlice.actions;
export default musicSearchSlice.reducer;
