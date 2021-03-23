import axios from "axios";
import { API_URL, SW_API_URL, SW_CLIENT_ID } from "../const";
import { Group, User } from "../reducer/sideBarReducer";

export type Noise = {
  id: number;
  name: string;
  url: string;
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
export type Music = {
  id: number;
  stream_url: string;
  title: string;
  artwork_url: string;
};
export async function getMusicList(q: string) {
  const { data } = await axios.get<Music[]>(
    `${SW_API_URL}/tracks?q=${q}&limit=50&client_id=${SW_CLIENT_ID}`
  );
  return data;
}
export type Auth = {
  accessToken: string;
  user: User;
};
export async function checkAuth() {
  const { data } = await axios.get<Auth>(`${API_URL}/auth/login/check`, {
    withCredentials: true,
  });
  return data;
}
export async function logout() {
  await axios.get<Auth>(`${API_URL}/auth/logout`, {
    withCredentials: true,
  });
}
type GroupPost = {
  userId: number;
  groupName: string;
  weather: string;
  noises: { name: string; volume: number }[];
  music: { url: string; volume: number };
};
export async function postGroups(accessToken: string, req: GroupPost) {
  const { data } = await axios.post<{ message: string }>(
    `${API_URL}/groups`,
    req,
    {
      headers: {
        authorization: accessToken,
      },
    }
  );
  return data;
}

export async function getGroups(accessToken: string, userId: number) {
  try {
    const { data } = await axios.get<{ message: string; data: Group[] }>(
      `${API_URL}/groups?userId=${userId}`,
      {
        headers: {
          authorization: accessToken,
        },
      }
    );
    return data;
  } catch (err) {
    return { data: [] };
  }
}
export async function deleteGroup(accessToken: string, groupId: number) {
  await axios.delete(`${API_URL}/groups/delete/${groupId}`, {
    headers: {
      authorization: accessToken,
    },
  });
}
export type RecommendRes = {
  groupcombMusic: { musicUrl: string };
  groupname: string;
  id: number;
  musicVolume: number;
  noise: { noise: { name: string }; volume: number }[];
  user: {
    id: number;
    email: string;
    profile: string;
  };
  weather: { weather: string };
};
export async function getRecommends() {
  const { data } = await axios.get<RecommendRes[]>(`${API_URL}/recommend`);
  return data;
}
export async function getRecommendsByNoises(noises: number[]) {
  const { data } = await axios.get<RecommendRes[]>(`${API_URL}/recommend`, {
    params: { noise: noises },
  });
  return data;
}
export async function getOtherGroups(userId: number) {
  const { data } = await axios.get<{ message: string; data: RecommendRes[] }>(
    `${API_URL}/recommend/others/${userId}`
  );
  return data;
}
