import axios, { AxiosResponse } from "axios";
import { setMatch } from "../store/matchStore";
import { environment } from "../utils/environment";

export interface Match {
  _id: {
    $oid: string;
  };
  is_active: boolean;
  match_number: Number;
  player1_cells: string[];
  player1_id: {
    $oid: string;
  };
  player2_cells: string[];
  player2_id: null | {
    $oid: string;
  };
  status: string;
  winner_id: null | {
    $oid: string;
  };
}

export async function createMatch() {
  const response: AxiosResponse = await axios.post(
    `${environment.server_url}/matches`
  );

  const match = response.data["match"] as Match;

  setMatch(match);
  return response;
}

export async function joinMatch(match_number: number) {
  const response: AxiosResponse = await axios.put(
    `${environment.server_url}/matches/${match_number}/join`
  );

  const match = response.data["match"] as Match;

  setMatch(match);
  return response;
}

export async function getOtherPlayer(player_id: string) {
  const response: AxiosResponse = await axios.get(
    `${environment.server_url}/players/${player_id}`
  );

  return response;
}

export async function updateMatch(match_number: Number) {
  const response: AxiosResponse = await axios.get(
    `${environment.server_url}/matches/${match_number}/refresh`
  );

  if (response.data["match"]) {
    const match = response.data["match"] as Match;
    setMatch(match);
  }

  return response.data["refresh"];
}

export async function makeMove(match_number: Number, markedCell: String) {
  const response: AxiosResponse = await axios.put(
    `${environment.server_url}/matches/${match_number}/make_move`,
    { celdamarcada: markedCell }
  );

  return response
}
