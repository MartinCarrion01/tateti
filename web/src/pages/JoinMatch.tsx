import { Text } from "@chakra-ui/react";
import HalfWidthCenter from "../common/components/HalfWidthCenter";
import SubTitle from "../common/components/SubTitle";
import JoinMatchForm from "../join_match/JoinMatchForm";

export default function JoinMatch() {
  return (
    <>
      <HalfWidthCenter>
        <SubTitle text={"Unirse a una partida"} />
        <Text fontSize="medium" textAlign="center" mb="5">
          Para unirse a una partida, escriba el numero (de 4 digitos) de la partida a la que
          desea unirse
        </Text>
        <JoinMatchForm />
      </HalfWidthCenter>
    </>
  );
}
