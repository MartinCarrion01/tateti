import { Box, Button, Flex } from "@chakra-ui/react";
import ButtonList from "../../common/components/ButtonList";
import HalfWidthCenter from "../../common/components/HalfWidthCenter";
import Title from "../../common/components/Title";
import Login from "../../user/Login";

export default function Menu(){

    return(
        <Flex direction="column" align="center" justify="center" my="50">
            <HalfWidthCenter color="#F47C7C">
                <Title title={"Ta-te-tí"}/>
            </HalfWidthCenter>
            <Login/>
            <Box bg='#FAD4D4' w='50%' p={4} alignItems="center">
                <ButtonList buttonList={["Iniciar partida", "Unirse a partida", "Historial de partidas", "Logout"]}/>
            </Box>
        </Flex>
    )
}