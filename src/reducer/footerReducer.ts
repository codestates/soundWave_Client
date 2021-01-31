import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type Noise = { id: number; picked: boolean; volume: number };
type FooterState = {
  noiseList: Record<string, Noise>;
  musicVolume: number;
};
const initialState: FooterState = {
  noiseList: {
    rain: {
      id: 1,
      picked: false,
      volume: 50,
    },
    wave: {
      id: 2,
      picked: false,
      volume: 50,
    },
    campfire: {
      id: 3,
      picked: false,
      volume: 50,
    },
    drive: {
      id: 4,
      picked: false,
      volume: 50,
    },

    night: {
      id: 5,
      picked: false,
      volume: 50,
    },
  },
  musicVolume: 50,
};
export type NoiseVolume = {
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
    turnOffAllNoise(state) {
      for (const key in state.noiseList) {
        state.noiseList[key].picked = false;
        state.noiseList[key].volume = 50;
      }
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
  turnOffAllNoise,
} = footerSlice.actions;
export default footerSlice.reducer;
