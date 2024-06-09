import React, { useState } from 'react';
import axios from 'axios';

const Cadastro = () => {
  const baseURL = 'https://localhost:7044/api/produtos';

  const [response, setResponse] = React.useState(null);
  const [validation, setValidation] = React.useState('');
  const [produto, setProduto] = useState({
    id: '',
    nome: '',
    valor: '',
    dataInclusao: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setProduto({
      ...produto,
      [name]: value,
    });
  };

  const produtoPost = async () => {
    delete produto.id;

    if (produto.nome === '') {
      setValidation('Nome é um campo obrigatório');
      return;
    }

    if (parseFloat(produto.valor) >= 1000000) {
      setValidation('Valor excede o máximo de 1 milhão');
      return;
    }

    produto.valor = parseFloat(produto.valor);
    produto.dataInclusao = new Date(
      new Date().toString().split('GMT')[0] + ' UTC',
    )
      .toISOString()
      .split('.')[0];

    await axios
      .post(baseURL, produto)
      .then((response) => {
        eraseFields();
        setResponse(response);
      })
      .catch((error) => {
        setResponse(error.response);
      });
  };

  const eraseFields = () => {
    document.getElementById('myForm').reset();
    setResponse(null);

    setProduto({
      id: '',
      nome: '',
      valor: '',
      dataInclusao: '',
    });
  };

  return (
    <div class="panel">
      <div class="panel-container">
        <div class="panel-hdr">
          <i class="fal fa-edit"></i>
          <h1 class="text-center display-4">Cadastrar Produtos</h1>
        </div>
        <div class="panel-content">
          <form class="form-cadastro" id="myForm">
            <div class="form-group">
              <label for="nome">Nome do produto</label>
              <input
                type="text"
                class="form-control"
                name="nome"
                placeholder="Informe o nome do produto"
                onChange={handleChange}
              ></input>
            </div>
            <div class="form-group mt-3">
              <label for="valor">Valor</label>
              <input
                type="text"
                class="form-control"
                name="valor"
                placeholder="Informe o valor do produto"
                onChange={handleChange}
              ></input>
            </div>
            <div class="d-flex justify-content-end mt-4">
              <button
                type="button"
                class="button button-edit me-3"
                onClick={() => eraseFields()}
              >
                Cancelar
              </button>
              <button
                type="button"
                class="button button-delete"
                onClick={() => produtoPost()}
              >
                Salvar
              </button>
            </div>

            {response && response.status === 201 && (
              <div class="alert alert-success text-center mt-3" role="alert">
                Produto cadastrado com sucesso!
              </div>
            )}

            {response && response.status === 400 && (
              <div class="alert alert-warning text-center mt-3" role="alert">
                {response.data.errors.Nome[0] !== ''
                  ? response.data.errors.Nome[0]
                  : 'Houve um erro ao realizar a solicitação'}
              </div>
            )}

            {validation && validation !== '' && (
              <div class="alert alert-warning text-center mt-3" role="alert">
                {validation}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
