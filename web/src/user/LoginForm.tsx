import { Button, Flex } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useState } from "react";
import AlertMessage from "../common/components/AlertMessage";
import Form from "../common/components/Form";
import InputText from "../common/components/InputText";
import { login } from "./userService";

export default function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      console.log(response);
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <Form>
        <Flex direction="column" align="center" justify="center" w="100%">
          {errorMessage ? <AlertMessage status="error" description={errorMessage} /> : ""}
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
            colorScheme={"red"}
            onClick={handleLogin}
            disabled={username === "" || password === ""}
          >
            Ingresar
          </Button>
        </Flex>
      </Form>
    </>
  );
}
