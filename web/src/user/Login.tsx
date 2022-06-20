import { Flex, Spacer } from "@chakra-ui/react";
import SubTitle from "../common/components/SubTitle";
import LoginForm from "./LoginForm";

export default function Login(){

    return(
        <>
            <Flex w={'50%'} direction="column" align="center">
                <SubTitle text={"Iniciar sesión"}/>
                <LoginForm/>
            </Flex>
        </>
    )
}