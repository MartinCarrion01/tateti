import { Square, Text } from "@chakra-ui/react";

interface Props{
    cellPressHandler?: () => void
}

export default function BoardCell(props: Props) {
  return (
    <Square size="100px" borderColor={"black"} borderWidth="thick" onClick={props.cellPressHandler}>
        <Text fontSize="4xl" color="#393E46"></Text>
    </Square>
  );
}
