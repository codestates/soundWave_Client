import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type Noise = { picked: boolean; volume: number };
type FooterState = {
  noiseList: Record<string, Noise>;
  musicVolume: number;
};
const initialState: FooterState = {
  noiseList: {
    rain: { picked: false, volume: 50 },
    drive: { picked: false, volume: 50 },
    wave: { picked: false, volume: 50 },
    night: { picked: false, volume: 50 },
    campfire: { picked: false, volume: 50 },
  },
  musicVolume: 50,
};
type NoiseVolume = {
  name: string;
  volume: number;
};
const footerSlice = createSlice({
  name: "musicSearch",
  initialState,
  reducers: {
    turnOnNoise(state, { payload }: PayloadAction<string>) {
      state.noiseList[payload].picked = true;
    },
    turnOffNoise(state, { payload }: PayloadAction<string>) {
      state.noiseList[payload].picked = false;
    },
    setVolume(state, { payload }: PayloadAction<NoiseVolume>) {
      const { name, volume } = payload;
      state.noiseList[name].volume = volume;
    },
    setMusicVolume(state, { payload }: PayloadAction<number>) {
      state.musicVolume = payload;
    },
  },
});
export const {
  turnOnNoise,
  turnOffNoise,
  setVolume,
  setMusicVolume,
} = footerSlice.actions;
export default footerSlice.reducer;
