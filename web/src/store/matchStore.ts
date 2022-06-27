import { useLayoutEffect, useState } from "react";
import { Subject } from "rxjs";
import { Match } from "../services/matchService";

let currentMatch: Match | undefined;

const matchSubject = new Subject<Match | undefined>();

export function useCurrentMatch() {
  const [match, setMatch] = useState(currentMatch);

  useLayoutEffect(() => {
    matchSubject.subscribe((newState) => {
      setMatch(newState);
    });
  }, []);

  return match;
}

export function setMatch(match: Match) {
  currentMatch = match;
  matchSubject.next(currentMatch);
}
