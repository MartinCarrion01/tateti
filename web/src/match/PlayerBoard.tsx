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
  const [otherPlayer, setOtherPlayer] = useState<Player | undefined>(undefined);

  useEffect(() => {
    const getPlayer = async () => {
      if (match) {
        if (match.player2_id) {
          const response = await getOtherPlayer(
            match.player1_id?.$oid as string
          );
          setOtherPlayer(response.data["player"] as Player);
        }
      }
    };
    getPlayer();
  }, [match]);

  return (
    <Flex
      direction="row"
      justify="space-between"
      width="100%"
      textAlign="center"
    >
      {user && match && otherPlayer ? (
        <>
          <PlayerBox
            player_name={
              user._id.$oid === match.player1_id.$oid
                ? user.username
                : otherPlayer.username
            }
          />
          <PlayerBox
            player_name={match.player2_id.$oid ? "Esperando" : "hola"}
          />
        </>
      ) : (
        <></>
      )}
    </Flex>
  );
}
