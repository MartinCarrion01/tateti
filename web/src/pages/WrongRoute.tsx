import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HalfWidthCenter from "../components/common/HalfWidthCenter";
import { useSessionToken } from "../store/tokenStore";
import { useSessionUser } from "../store/userStore";

export default function WrongRoute() {
  const user = useSessionUser();
  const navigate = useNavigate();
  const token = useSessionToken();

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    }
  }, [user, token, navigate]);

  return (
    <HalfWidthCenter>
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, teal.400, teal.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Página no encontrada
        </Text>
        <Text color={"gray.500"} mb={6}>
          La página que usted ingreso no existe
        </Text>
      </Box>
    </HalfWidthCenter>
  );
}
