import React from 'react';
import box from './assets/box.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
        <div class="container-fluid">
          <img class="box-logo" src={box} alt="box" />
          <a class="navbar-brand">Produtos Web</a>
          <div class="navbar-collapse">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link to="/">
                  <a class="nav-link text-dark">Home</a>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/cadastro">
                  <a class="nav-link text-dark">Cadastrar Produto</a>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/consulta">
                  <a class="nav-link text-dark">Consultar Produtos</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
