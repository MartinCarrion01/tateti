import { Button, VStack } from "@chakra-ui/react";

interface Props {
  buttonList: String[];
}

export default function ButtonList(props: Props) {
  return (
    <>
      <VStack
        spacing={4}
        align="stretch"
      >
        {props.buttonList.map((text) => {return(
            <Button colorScheme="red" size="lg">
                {text}
            </Button>
        )})}
      </VStack>
    </>
  );
}
