import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../common/components/AlertMessage";
import Form from "../common/components/Form";
import InputText from "../common/components/InputText";
import { joinMatch, Match } from "../match/matchService";

const numberRegex = /([0-9]{6})+/

export default function JoinMatchForm() {
  const [matchNumber, setMatchNumber] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleJoin = async () => {
    try {
      const response = await joinMatch(parseInt(matchNumber));
      navigate(`/match/${(response.data["match"] as Match).match_number}`);
    } catch (error: any) {
      setErrorMessage(JSON.stringify(error.response.data.message));
    }
  };

  return (
    <Form>
      {errorMessage ? (
        <AlertMessage status="error" description={errorMessage} />
      ) : (
        <></>
      )}
      <InputText
        label="Numero de la partida"
        name="match_number"
        setValue={setMatchNumber}
        value={matchNumber}
      />
      <Button
        colorScheme={"teal"}
        onClick={handleJoin}
        disabled={matchNumber.length !== 6 || !numberRegex.test(matchNumber)}
      >
        Unirse
      </Button>
    </Form>
  );
}
