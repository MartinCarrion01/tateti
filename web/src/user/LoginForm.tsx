import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import InputText from "../common/components/InputText";

export default function LoginForm(){

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    

    return(
        <>
            <form>
                <Flex direction="column" align="center" justify="center" w="100%">
                        <InputText label={"Nombre de usuario"} name={"username"} value={username} setValue={setUsername} password={false}/>
                        <InputText label={"Contraseña"} name={"password"} value={password} setValue={setPassword} password={true}/>
                </Flex>
            </form>
        </>
    )
}