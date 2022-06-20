import axios, { AxiosResponse } from "axios";
import { setToken } from "../store/tokenStore";
import { environment } from "../utils/environment";

export interface Player {
  username: string;
  password: string;
}

export async function login(username: string, password: string) {
  const response: AxiosResponse = await axios.post(
    `${environment.server_url}/players/login`,
    { username, password }
  );

  if (response.status === 200) {
    setToken(response.data["player"]._id["$oid"]);
  }

  return response;
}
