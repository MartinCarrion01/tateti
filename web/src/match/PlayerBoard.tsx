import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCurrentMatch } from "../store/matchStore";
import { useSessionUser } from "../store/userStore";
import { Player } from "../user/userService";
import { getOtherPlayer } from "./matchService";
import PlayerBox from "./Player";

export default function PlayerBoard() {
  const user = useSessionUser();
  const match = useCurrentMatch();
  const [otherPlayer, setOtherPlayer] = useState<string>("");

  useEffect(() => {
    const getPlayer = async () => {
      if (match && user) {
        if (user._id.$oid === match.player1_id.$oid) {
          if (match.player2_id) {
            const response = await getOtherPlayer(
              match.player2_id?.$oid as string
            );
            setOtherPlayer((response.data["player"] as Player).username);
          } else {
            setOtherPlayer("Esperando jugador");
          }
        } else {
          if (match.player2_id) {
            console.log(match);
            const response = await getOtherPlayer(match.player1_id.$oid);
            console.log("else if", response);
            setOtherPlayer((response.data["player"] as Player).username);
          }
        }
      }
    };
    getPlayer();
  }, [match, user]);

  console.log(otherPlayer, user?.username, match?.player1_id);

  return (
    <Flex
      direction="row"
      justify="space-between"
      width="100%"
      textAlign="center"
      my="2"
    >
      {user && match ? (
        <>
          <PlayerBox
            player_name={
              user._id.$oid === match.player1_id.$oid
                ? user.username
                : otherPlayer
            }
          />
          <PlayerBox player_name={otherPlayer} />
        </>
      ) : (
        <></>
      )}
    </Flex>
  );
}
