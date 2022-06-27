import axios, { AxiosResponse } from "axios";
import { setToken } from "../store/tokenStore";
import { setUser } from "../store/userStore";
import { environment } from "../utils/environment";

export interface Player {
  username: string;
  password: string;
  in_game: boolean;
  _id: {
    $oid: string;
  };
}

export async function login(username: string, password: string) {
  const response: AxiosResponse = await axios.post(
    `${environment.server_url}/players/login`,
    { username, password }
  );

  const player = response.data["player"] as Player;

  setToken(player._id.$oid);
  setUser(player);
  return response;
}

export async function register(username: string, password: string) {
  const response: AxiosResponse = await axios.post(
    `${environment.server_url}/players`,
    { username, password }
  );
  const player = response.data["player"] as Player;

  setToken(player._id.$oid);
  setUser(player);
  return response;
}
