import { useLayoutEffect, useState } from "react";
import { Subject } from "rxjs";
import { Player } from "../services/userService";

let currentUser: Player | undefined;

const userSubject = new Subject<Player | undefined>();

export function useSessionUser() {
  const [user, setUser] = useState(currentUser);

  useLayoutEffect(() => {
    userSubject.subscribe((newState) => {
      setUser(newState);
    });
  }, []);

  return user;
}

export function setUser(player: Player) {
  currentUser = player;
  userSubject.next(currentUser);
}

export function cleanupUser() {
  currentUser = undefined;
  userSubject.next(currentUser);
}
