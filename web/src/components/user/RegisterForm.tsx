import { Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../common/AlertMessage";
import Form from "../common/Form";
import InputText from "../common/InputText";
import { register } from "../../services/userService";

export default function RegisterForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register(username, password);
      navigate("/");
    } catch (error: any) {
      setErrorMessage(JSON.stringify(error.response.data.message));
    }
  };

  return (
    <>
      <Form>
        {errorMessage ? (
          <AlertMessage status="error" description={errorMessage} />
        ) : (
          <></>
        )}
        <InputText
          label={"Nombre de usuario"}
          name={"username"}
          value={username}
          setValue={setUsername}
          password={false}
        />
        <InputText
          label={"Contraseña"}
          name={"password"}
          value={password}
          setValue={setPassword}
          password={true}
        />
        <Button
          colorScheme={"teal"}
          onClick={handleRegister}
          disabled={username === "" || password === ""}
        >
          Registrarse
        </Button>
      </Form>
    </>
  );
}
