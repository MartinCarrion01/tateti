import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCurrentMatch } from "../../store/matchStore";
import { useSessionUser } from "../../store/userStore";
import { Player } from "../../services/userService";
import { getOtherPlayer } from "../../services/matchService";
import PlayerBox from "./PlayerBox";

export default function PlayerBoard() {
  const user = useSessionUser();
  const match = useCurrentMatch();
  const [otherPlayer, setOtherPlayer] = useState<string>("");

  useEffect(() => {
    const getPlayer = async () => {
      if (match && user) {
        if (match.player2_id) {
          if (user._id.$oid === match.player1_id.$oid) {
            const response = await getOtherPlayer(
              match.player2_id?.$oid as string
            );
            setOtherPlayer((response.data["player"] as Player).username);
          } else if (user._id.$oid === match.player2_id.$oid) {
            const response = await getOtherPlayer(
              match.player1_id?.$oid as string
            );
            setOtherPlayer((response.data["player"] as Player).username);
          }
        } else {
          setOtherPlayer("Esperando jugador");
        }
      }
    };
    getPlayer();
  }, [match, user]);

  const resultEmoji = (player_id: string) => {
    if(match?.status === "finalizado"){
      if(match.winner_id){
        if(match.winner_id.$oid === player_id){
          return "🤩"
        }else{
          return "😥"
        }
      }else{
        return "😑"
      }
    }else{
      return ""
    }
  }

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
              `${user._id.$oid === match.player1_id.$oid
                ? user.username
                : otherPlayer} ${resultEmoji(match.player1_id.$oid)}`
            }
          />
          <PlayerBox
            player_name={
              `${resultEmoji(match.player2_id?.$oid as string)} ${user._id.$oid === match.player1_id.$oid
                ? otherPlayer
                : (match.player2_id ? user.username : "")}` 
            }
          />
        </>
      ) : (
        <></>
      )}
    </Flex>
  );
}
