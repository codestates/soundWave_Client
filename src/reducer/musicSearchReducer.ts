import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {
  isSearchOpen: false,
  searchInput: "",
  sampleUrl: "",
  musicUrl: "",
};
const musicSearchSlice = createSlice({
  name: "musicSearch",
  initialState,
  reducers: {
    openSearch(state) {
      state.isSearchOpen = true;
    },
    setSearchInput(state, { payload }: PayloadAction<string>) {
      state.searchInput = payload;
    },
    listenSample(state, { payload }: PayloadAction<string>) {
      state.sampleUrl = payload;
    },
    pickMusic(state, { payload }: PayloadAction<string>) {
      state.musicUrl = payload;
    },
    closeSearch(state) {
      state.isSearchOpen = false;
    },
  },
});
export const {
  openSearch,
  setSearchInput,
  listenSample,
  pickMusic,
  closeSearch,
} = musicSearchSlice.actions;
export default musicSearchSlice.reducer;
