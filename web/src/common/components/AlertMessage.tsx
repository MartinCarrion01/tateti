import { Alert, AlertDescription, AlertIcon} from "@chakra-ui/react";

interface Props{
    status: "info"|"warning"|"success"|"error"|undefined,
    description: string | null
}
export default function AlertMessage(props: Props) {
  return (
    <Alert status={props.status}>
      <AlertIcon />
      <AlertDescription>
        {props.description}
      </AlertDescription>
    </Alert>
  );
}
