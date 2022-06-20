import axios from "axios";
import { Subject } from "rxjs";

let currentToken: string | undefined;

const tokenSubject = new Subject();

export function setToken(token: string) {
  currentToken = token;
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  tokenSubject.next(currentToken);
}
