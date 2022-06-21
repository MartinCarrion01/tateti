import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import { Flex } from "@chakra-ui/react";
import HalfWidthCenter from "./common/components/HalfWidthCenter";
import Title from "./common/components/Title";
import Register from "./pages/Register";

function App() {
  return (
    <Flex direction="column" align="center" justify="center" my="50">
      <HalfWidthCenter color="#00ADB5">
        <Title title={"Ta-te-tí"} />
      </HalfWidthCenter>
      <Routes>
        <Route path={"/"} element={<Menu />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
      </Routes>
    </Flex>
  );
}

export default App;
