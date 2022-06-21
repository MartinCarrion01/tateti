import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonList from "../common/components/ButtonList";
import HalfWidthCenter from "../common/components/HalfWidthCenter";
import { cleanupToken, useSessionToken } from "../store/tokenStore";
import { cleanupUser, useSessionUser } from "../store/userStore";

export default function Menu(props: any) {
  const user = useSessionUser();
  const token = useSessionToken();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    }
  }, [user, token, navigate]);

  const logoutHandler = () => {
    cleanupUser();
    cleanupToken();
  }

  return (
    <>
      <HalfWidthCenter>
        <ButtonList
          buttonList={[
            { label: "Iniciar partida", handler: () => navigate("/") },
            { label: "Unirse a partida", handler: () => navigate("/") },
            { label: "Cerrar sesión", handler: () => logoutHandler() },
          ]}
        />
      </HalfWidthCenter>
    </>
  );
}
