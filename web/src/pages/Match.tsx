import { Flex, Text } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HalfWidthCenter from "../components/common/HalfWidthCenter";
import SubTitle from "../components/common/SubTitle";
import Board from "../components/match/Board";
import BoardContainer from "../components/match/BoardContainer";
import LeaveButton from "../components/match/LeaveButton";
import MatchTimer from "../components/match/MatchTimer";
import PlayerBoard from "../components/match/PlayerBoard";
import { useCurrentMatch } from "../store/matchStore";
import { useSessionToken } from "../store/tokenStore";
import { useSessionUser } from "../store/userStore";

const refreshContextDefaultValue = {
  state: true,
  setState: (state: boolean) => {}, // noop default callback
};

export const RefreshContext = createContext(refreshContextDefaultValue);

export default function Match() {
  const match = useCurrentMatch();
  const user = useSessionUser();
  const navigate = useNavigate();
  const token = useSessionToken();
  const [refresh, setRefresh] = useState<boolean>(
    refreshContextDefaultValue.state
  );

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    }
  }, [user, token, navigate]);

  if (!match && !user) {
    return <></>;
  }

  const getStatus = () => {
    switch (match?.status) {
      case "juegap1":
        if (match.player1_id.$oid === user?._id.$oid) {
          return "Tu turno";
        } else if (match.player2_id?.$oid === user?._id.$oid) {
          return "Juega el otro";
        }
        return "";
      case "juegap2":
        if (match.player1_id.$oid === user?._id.$oid) {
          return "Juega el otro";
        } else if (match.player2_id?.$oid === user?._id.$oid) {
          return "Tu turno";
        }
        return "";
      case "finalizado":
        if (match.winner_id) {
          if (match.winner_id?.$oid === user?._id.$oid) {
            return "¡¡Ganaste!!";
          } else {
            return "Perdiste...";
          }
        } else {
          return "Empate...";
        }
      default:
        return "";
    }
  };

  return (
    <>
      <RefreshContext.Provider value={{ state: refresh, setState: setRefresh }}>
        {refresh ? <MatchTimer setter={setRefresh} /> : ""}
        <HalfWidthCenter>
          <Flex alignItems="center" direction="column">
            <SubTitle text={match ? `Partida n°${match.match_number}` : ""} />
            {!match?.player2_id ? (
              <Text fontSize="md">
                Pasále este numero a la persona con la que querés jugar para
                comenzar la partida
              </Text>
            ) : (
              <></>
            )}
            <PlayerBoard />
            <SubTitle text={getStatus()} />
            <BoardContainer>
              <Board />
            </BoardContainer>
            <LeaveButton />
          </Flex>
        </HalfWidthCenter>
      </RefreshContext.Provider>
    </>
  );
}
