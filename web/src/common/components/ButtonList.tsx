import { Button, VStack } from "@chakra-ui/react";

export interface ButtonFormat {
  label: string;
  handler: () => void;
}

interface Props {
  buttonList: ButtonFormat[];
  disabled: boolean;
}

export default function ButtonList(props: Props) {
  return (
    <>
      <VStack spacing={4} align="stretch">
        {props.buttonList.map((button, index) => {
          return (
            <Button
              colorScheme="teal"
              size="lg"
              key={index}
              onClick={button.handler}
              disabled={props.disabled}
            >
              {button.label}
            </Button>
          );
        })}
      </VStack>
    </>
  );
}
