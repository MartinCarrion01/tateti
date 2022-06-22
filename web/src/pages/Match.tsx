import { Flex } from "@chakra-ui/react";
import HalfWidthCenter from "../common/components/HalfWidthCenter";
import Board from "../match/Board";
import BoardContainer from "../match/BoardContainer";
import PlayerBoard from "../match/PlayerBoard";

export default function Match() {
  return (
    <>
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
