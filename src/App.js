import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Home from './Home';
import Consulta from './Consulta';
import Cadastro from './Cadastro';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/consulta" element={<Consulta />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
