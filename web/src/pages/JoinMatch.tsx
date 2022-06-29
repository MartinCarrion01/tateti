import { Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HalfWidthCenter from "../components/common/HalfWidthCenter";
import SubTitle from "../components/common/SubTitle";
import JoinMatchForm from "../components/join_match/JoinMatchForm";
import { useSessionUser } from "../store/userStore";

export default function JoinMatch() {
  const user = useSessionUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <HalfWidthCenter>
        <SubTitle text={"Unirse a una partida"} />
        <Text fontSize="medium" textAlign="center" mb="5">
          Para unirse a una partida, escribí el numero (de 6 dígitos) de la
          partida a la que deseas unirte
        </Text>
        <JoinMatchForm />
      </HalfWidthCenter>
    </>
  );
}
