import { Box, Button, Flex } from "@chakra-ui/react";
import ButtonList from "../../common/components/ButtonList";
import Title from "../../common/components/Title";
import Login from "../../user/Login";

export default function Menu(){

    return(
        <Flex direction="column" align="center" justify="center" my="100">
            <Box bg='#F47C7C' w='50%' p={4} alignItems="center" mb="5">
                <Title title={"Ta-te-tí"}/>
            </Box>
            <Login/>
            <Box bg='#FAD4D4' w='50%' p={4} alignItems="center">
                <ButtonList buttonList={["Iniciar partida", "Unirse a partida", "Historial de partidas", "Logout"]}/>
            </Box>
        </Flex>
    )
}