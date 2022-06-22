import { useEffect } from "react";
import { useCurrentMatch } from "../store/matchStore";
import { updateMatch } from "./matchService";

interface Props {
  setter: React.Dispatch<React.SetStateAction<Boolean>>;
}
export default function MatchTimer(props: Props) {
  const match = useCurrentMatch();

  const update = async () => {
    if (match) {
      const result = await updateMatch(match.match_number);
      props.setter(result);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("llamando");
      update();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return <></>;
}
