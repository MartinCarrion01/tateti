import { Grid } from "@chakra-ui/react";
import BoardCell from "./BoardCell";

const cellIds = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];

export default function Board() {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={1}>
      {cellIds.map((id) => (
        <BoardCell key={id} />
      ))}
    </Grid>
  );
}
