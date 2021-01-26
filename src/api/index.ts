import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
export type Noise = {
  id: number;
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
  const { data } = await axios.get<Noise[]>(`${API_URL}/noises`);
  return data;
}
export async function getMusicList(q: string) {
  const { data } = await axios.get<Music[]>(
    `https://api.soundcloud.com/tracks?q=${q}&limit=50&client_id=3c1222aaa64b9dc73bc257260a5497cb`
  );
  return data;
}
