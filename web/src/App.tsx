import "./App.css";
import { Route, Routes} from "react-router-dom";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import { Flex } from "@chakra-ui/react";
import HalfWidthCenter from "./components/common/HalfWidthCenter";
import Title from "./components/common/Title";
import Register from "./pages/Register";
import Match from "./pages/Match";
import JoinMatch from "./pages/JoinMatch";
import WrongRoute from "./pages/WrongRoute";

export default function App() {
  return (
    <Flex direction="column" align="center" justify="center" my="50">
      <HalfWidthCenter color="#00ADB5">
        <Title title={"Ta-te-tí"} />
      </HalfWidthCenter>
      <Routes>
        <Route path={"/"} element={<Menu />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/match/:id"} element={<Match />} />
        <Route path={"/join_match"} element={<JoinMatch />} />
        <Route path="*" element={<WrongRoute />} />
      </Routes>
    </Flex>
  );
}
