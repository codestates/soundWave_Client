import axios from "axios";
import { SW_API_URL, SW_CLIENT_ID } from "../const";
const API_URL = process.env.REACT_APP_API_URL;
export type Noise = {
  name: string;
  url: string;
};
export type Music = {
  id: number;
  stream_url: string;
  title: string;
  artwork_url: string;
};

export async function getNoises() {
  const {
    data: {
      data: { noises },
    },
  } = await axios.get<{
    data: { noises: Noise[] };
  }>(`${API_URL}/noises`);
  return noises;
}
export async function getMusicList(q: string) {
  const { data } = await axios.get<Music[]>(
    `${SW_API_URL}/tracks?q=${q}&limit=50&client_id=${SW_CLIENT_ID}`
  );
  return data;
}
