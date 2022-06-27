import { Box } from "@chakra-ui/react";
import SubTitle from "../common/SubTitle";

interface Props {
  player_name: string | undefined;
}

export default function PlayerBox(props: Props) {
  return (
    <Box>
      <SubTitle text={props.player_name ? props.player_name : ""} />
    </Box>
  );
}
