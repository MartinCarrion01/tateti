import { Flex } from "@chakra-ui/react";
import {useState } from "react";
import HalfWidthCenter from "../common/components/HalfWidthCenter";
import Board from "../match/Board";
import BoardContainer from "../match/BoardContainer";
import MatchTimer from "../match/MatchTimer";
import PlayerBoard from "../match/PlayerBoard";

export default function Match() {
  const [refresh, setRefresh] = useState<Boolean>(true);
  
  return (
    <>
      {refresh ? <MatchTimer setter={setRefresh}/> : ""}
      <HalfWidthCenter>
        <Flex alignItems="center" direction="column">
          <PlayerBoard />
          <BoardContainer>
            <Board />
          </BoardContainer>
        </Flex>
      </HalfWidthCenter>
    </>
  );
}
