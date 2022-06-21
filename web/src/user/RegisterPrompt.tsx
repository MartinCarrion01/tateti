import { Flex, Link, Text } from "@chakra-ui/react";
import {Link as ReactRouterLink} from "react-router-dom"

export default function RegisterPrompt() {
  return (
    <Flex direction="row" align="center" justify="center" w="100%" mt="2">
      <Text>
        ¿No tiene cuenta?{" "}
        <Link color="teal.500" as={ReactRouterLink} to="/register">
          Regístrese.
        </Link>
      </Text>
    </Flex>
  );
}
