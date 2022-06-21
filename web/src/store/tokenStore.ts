import axios from "axios";
import React from "react";
import { Subject } from "rxjs";

let currentToken: string | undefined;

const tokenSubject = new Subject<string | undefined>();

export function useSessionToken() {
  const [token, setToken] = React.useState(currentToken);

  React.useLayoutEffect(() => {
    tokenSubject.subscribe((newState) => {
      setToken(newState);
    });
  }, []);

  return token;
}

export function setToken(token: string) {
  currentToken = token;
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  tokenSubject.next(currentToken);
}

export function cleanupToken() {
  currentToken = undefined
  tokenSubject.next(currentToken)
}
