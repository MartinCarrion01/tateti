import React from "react";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../common/components/AlertMessage";
import ButtonList from "../common/components/ButtonList";
import HalfWidthCenter from "../common/components/HalfWidthCenter";
import { Match, createMatch } from "../match/matchService";
import { cleanupToken, useSessionToken } from "../store/tokenStore";
import { cleanupUser, useSessionUser } from "../store/userStore";

export default function Menu(props: any) {
  const user = useSessionUser();
  const token = useSessionToken();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [disabled, setDisabled] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    }
  }, [user, token, navigate]);

  const logoutHandler = () => {
    cleanupUser();
    cleanupToken();
  };

  const createMatchHandler = async () => {
    setDisabled(true);
    try {
      const response = await createMatch();
      navigate(`/match/${(response.data["match"] as Match).match_number}`);
    } catch (error: any) {
      setDisabled(false);
      setErrorMessage(JSON.stringify(error.response.data.message));
    }
  };

  return (
    <>
      <HalfWidthCenter>
        {errorMessage ? (
          <AlertMessage status="error" description={errorMessage} />
        ) : (
          <></>
        )}
        <ButtonList
          buttonList={[
            { label: "Iniciar partida", handler: () => createMatchHandler() },
            {
              label: "Unirse a partida",
              handler: () => navigate("/join_match"),
            },
            { label: "Cerrar sesión", handler: () => logoutHandler() },
          ]}
          disabled={disabled}
        />
      </HalfWidthCenter>
    </>
  );
}
