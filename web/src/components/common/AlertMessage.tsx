import { Alert, AlertDescription, AlertIcon } from "@chakra-ui/react";

interface Props {
  status: "info" | "warning" | "success" | "error" | undefined;
  description: string | null;
  width?: string | null;
}

export default function AlertMessage(props: Props) {
  return (
    <Alert
      status={props.status}
      bgColor="white"
      borderRadius={15}
      mb="5"
      width={props.width ? props.width : "auto"}
      textAlign="center"
      justifyContent='center'
    >
      <AlertIcon />
      <AlertDescription>{props.description}</AlertDescription>
    </Alert>
  );
}
