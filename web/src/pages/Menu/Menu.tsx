import { Box, Button, Flex } from "@chakra-ui/react";
import ButtonList from "./components/ButtonList";
import Title from "./components/Title";

export default function Menu(){
    return(
        <>
            <Flex direction="column" align="center" justify="center" mt="50">
                <Box bg='#F47C7C' w='50%' p={4} alignItems="center" mb="5">
                    <Title title={"Ta-te-tí"}/>
                </Box>
                <Box bg='#FAD4D4' w='50%' p={4} alignItems="center">
                    <ButtonList buttonList={["Iniciar partida", "Unirse a partida", "Historial de partidas", "Logout"]}/>
                </Box>
            </Flex>
        </>
    )
}