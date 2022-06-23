import { useCurrentMatch } from "../store/matchStore";

export default function Status() {
  const match = useCurrentMatch();
  return <>{match?.status}</>;
}
