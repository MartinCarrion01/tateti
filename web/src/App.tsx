import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Menu from './pages/Menu/Menu';

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Menu/>}/>
      </Routes>
    </>
  );
}

export default App;
