import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isSearchOpen: false,
  musicUrl: "",
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
    pickMusic(state, { payload }: PayloadAction<string>) {
      state.musicUrl = payload;
    },
  },
});
export const { openSearch, closeSearch, pickMusic } = musicSearchSlice.actions;
export default musicSearchSlice.reducer;
