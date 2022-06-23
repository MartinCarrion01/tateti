import { Flex, Text } from "@chakra-ui/react";
import { createContext, useState } from "react";
import HalfWidthCenter from "../common/components/HalfWidthCenter";
import SubTitle from "../common/components/SubTitle";
import Board from "../match/Board";
import BoardContainer from "../match/BoardContainer";
import MatchTimer from "../match/MatchTimer";
import PlayerBoard from "../match/PlayerBoard";
import Status from "../match/Status";
import { useCurrentMatch } from "../store/matchStore";
import { useSessionUser } from "../store/userStore";

const refreshContextDefaultValue = {
  state: true,
  setState: (state: boolean) => {}, // noop default callback
};

export const RefreshContext = createContext(refreshContextDefaultValue);

export default function Match() {
  const match = useCurrentMatch();
  const user = useSessionUser();
  const [refresh, setRefresh] = useState<boolean>(
    refreshContextDefaultValue.state
  );
  
  if(!match && !user){
    return (<></>)
  }

  return (
    <>
      <RefreshContext.Provider value={{ state: refresh, setState: setRefresh }}>
        {refresh ? <MatchTimer setter={setRefresh} /> : ""}
        <HalfWidthCenter>
          <Flex alignItems="center" direction="column">
            <SubTitle text={match ? `Partida n°${match.match_number}` : ""} />
            <Text fontSize="md">
              Pasále este numero a la persona con la querés jugar para comenzar
              la partida
            </Text>
            <PlayerBoard />
            <Status />
            <BoardContainer>
              <Board />
            </BoardContainer>
          </Flex>
        </HalfWidthCenter>
      </RefreshContext.Provider>
    </>
  );
}
