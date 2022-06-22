import React from "react";
import { Subject } from "rxjs";
import { Player } from "../user/userService";

let currentUser: Player | undefined;

const userSubject = new Subject<Player | undefined>();

export function useSessionUser() {
  const [user, setUser] = React.useState(currentUser);

  React.useLayoutEffect(() => {
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
