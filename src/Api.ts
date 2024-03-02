import axios from "axios";
import { Leaderboard, Record } from "./Type";

const client = axios.create({
  baseURL:
    process.env.REACT_APP_CATCH_GAME_BACKEND_HOST || "http://localhost:8080",
});

export const getLeaderboard = async (): Promise<Leaderboard> => {
  const { data } = await client.get<Leaderboard>("/leaderboard");
  return data;
};

export const createRecord = async ({ name, score }: Record): Promise<void> => {
  await client.post<void>("/leaderboard/createRecord", { name, score });
};

const api = {
  getLeaderboard,
  createRecord,
};

export default api;
