import {Center } from "@chakra-ui/react";

interface Props {
  children: JSX.Element | JSX.Element[];
}
export default function BoardContainer(props: Props) {
  return <Center width="75%">{props.children}</Center>;
}
