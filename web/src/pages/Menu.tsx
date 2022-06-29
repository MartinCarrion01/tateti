import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../components/common/AlertMessage";
import ButtonList, { ButtonFormat } from "../components/menu/ButtonList";
import HalfWidthCenter from "../components/common/HalfWidthCenter";
import { Match, createMatch, getMatchByPlayer } from "../services/matchService";
import { cleanupUser, useSessionUser } from "../store/userStore";

export default function Menu(props: any) {
  const user = useSessionUser();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const logoutHandler = () => {
    cleanupUser();
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

  const returnToMatchHandler = async () => {
    setDisabled(true);
    try {
      const response = await getMatchByPlayer(user?._id.$oid as string);
      navigate(`/match/${(response.data["match"] as Match).match_number}`);
    } catch (error: any) {
      setDisabled(false);
      setErrorMessage(JSON.stringify(error.response.data.message));
    }
  }

  const defaultButtons: ButtonFormat[] = [
    { label: "Iniciar partida", handler: () => createMatchHandler() },
    {
      label: "Unirse a partida",
      handler: () => navigate("/join_match"),
    },
    { label: "Cerrar sesión", handler: () => logoutHandler() },
  ];

  const returnToMatch: ButtonFormat[] = [
    { label: "Volver a la partida", handler: () => returnToMatchHandler() },
  ];

  return (
    <>
      <HalfWidthCenter>
        {errorMessage ? (
          <AlertMessage status="error" description={errorMessage} />
        ) : (
          <></>
        )}
        <ButtonList
          buttonList={
            user?.in_game
              ? returnToMatch.concat(
                  defaultButtons.filter((e) => e.label === "Cerrar sesión")
                )
              : defaultButtons
          }
          disabled={disabled}
        />
      </HalfWidthCenter>
    </>
  );
}
