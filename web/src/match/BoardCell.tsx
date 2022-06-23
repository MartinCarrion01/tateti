import { Square, Text, useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { RefreshContext } from "../pages/Match";
import { useCurrentMatch } from "../store/matchStore";
import { makeMove } from "./matchService";

interface Props {
  cellId: String;
}

export default function BoardCell(props: Props) {
  const [value, setValue] = useState<"X" | "O" | "">("");
  const match = useCurrentMatch();
  const toast = useToast();
  const {state, setState} = useContext(RefreshContext);

  useEffect(() => {
    if (match) {
      if (match.player1_cells.includes(props.cellId as string)) {
        setValue("X");
      } else {
        if (match.player2_cells.includes(props.cellId as string)) {
          setValue("O");
        }
      }
    }
  }, [match, props.cellId]);

  const markGrid = (id: String) => {
    if (match) {
      makeMove(match.match_number, id)
        .then((data) => {
          console.log("todo ok");
          if (match.status === "juegap1") {
            setValue("X");
          } else if (match.status === "juegap2") {
            setValue("O");
          }
          setState(!state)
        })
        .catch((error) => {
          console.log(error)
          toast({
            title: "Ha ocurrido un error",
            description: JSON.stringify((error as AxiosError).response?.data),
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        });
    }
  };

  return (
    <Square
      size="100px"
      borderColor={"black"}
      borderWidth="thick"
      onClick={() => markGrid(props.cellId)}
    >
      <Text fontSize="4xl" color="#393E46">
        {value}
      </Text>
    </Square>
  );
}
