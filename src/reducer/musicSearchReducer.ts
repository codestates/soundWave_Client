import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {
  searchInput: "",
  sampleUrl: "",
  musicUrl: "",
};
const musicSearchSlice = createSlice({
  name: "musicSearch",
  initialState,
  reducers: {
    setSearchInput(state, { payload }: PayloadAction<string>) {
      state.searchInput = payload;
    },
    listenSample(state, { payload }: PayloadAction<string>) {
      state.sampleUrl = payload;
    },
    pickMusic(state, { payload }: PayloadAction<string>) {
      state.musicUrl = payload;
    },
  },
});
export const {
  setSearchInput,
  listenSample,
  pickMusic,
} = musicSearchSlice.actions;
export default musicSearchSlice.reducer;
