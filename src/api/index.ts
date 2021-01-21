import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
export type Noise = {
  id: number;
  name: string;
  url: string;
};
export async function getNoises() {
  const { data } = await axios.get<Noise[]>(`${API_URL}/noises`);
  return data;
}
