import React from 'react';
import { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';

const Consulta = () => {
  const baseURL = 'https://localhost:7044/api/produtos';
  const [data, setData] = useState([]);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [response, setResponse] = React.useState(null);
  const [validation, setValidation] = React.useState('');

  const [produtoSelected, setProdutoSelected] = useState({
    id: '',
    nome: '',
    valor: '',
    dataInclusao: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setProdutoSelected({
      ...produtoSelected,
      [name]: value,
    });
  };

  const getProdutosData = async () => {
    await axios
      .get(baseURL)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProdutosData();
  }, []);

  const confirmDeleteClick = async () => {
    await axios
      .delete(baseURL + '/' + produtoSelected.id)
      .then((response) => {
        setData(
          data.filter((dataProduto) => produtoSelected.id !== dataProduto.id),
        );
        openCloseDeleteModal(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const produtoPut = async () => {
    if (produtoSelected.nome === '') {
      setValidation('Nome é um campo obrigatório');
      return;
    }

    if (parseFloat(produtoSelected.valor) >= 1000000) {
      setValidation('Valor excede o máximo de 1 milhão');
      return;
    }

    await axios
      .put(baseURL + '/' + produtoSelected.id, produtoSelected)
      .then((response) => {
        let produtos = data;
        // eslint-disable-next-line
        produtos.map((prod) => {
          if (prod.id === produtoSelected.id) {
            prod.nome = produtoSelected.nome;
            prod.valor = produtoSelected.valor;
          }
        });
        setResponse(response);
        openCloseEditModal(null);
      });
  };

  const openCloseDeleteModal = (produto) => {
    if (produto != null) setProdutoSelected(produto);
    setModalDelete(!modalDelete);
  };

  const openCloseEditModal = (produto) => {
    if (produto != null) setProdutoSelected(produto);
    setValidation('');
    setModalEdit(!modalEdit);
  };

  return (
    <div class="panel">
      <div class="panel-container">
        <div class="panel-hdr">
          <i class="fal fa-edit"></i>
          <h1 class="text-center display-4">Consultar Produtos</h1>
        </div>
        <div class="panel-content">
          <table class="table table-borderless mt-3">
            <thead>
              <tr>
                <th class="lead">Produto</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th class="lead float-end">Valor</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((produto) => (
                <tr key={produto.id}>
                  <td>{produto.nome}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="float-end">R$ {produto.valor}</td>
                  <td></td>
                  <td class="float-end">
                    <button
                      class="button button-edit"
                      onClick={() => openCloseEditModal(produto)}
                    >
                      Editar
                    </button>
                  </td>
                  <td>
                    <button
                      class="button button-delete"
                      onClick={() => openCloseDeleteModal(produto)}
                    >
                      Apagar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modalDelete}>
        <ModalHeader class="text-center mt-4">Confirmar Exclusão</ModalHeader>
        <ModalBody>
          <p class="text-center">
            Tem certeza que deseja excluir o produto {produtoSelected.nome} ?
          </p>
        </ModalBody>
        <ModalFooter>
          <button
            class="button button-edit"
            onClick={() => openCloseDeleteModal()}
          >
            Cancelar
          </button>
          <button
            class="button button-delete"
            onClick={() => confirmDeleteClick(produtoSelected)}
          >
            Apagar
          </button>
        </ModalFooter>
      </Modal>

      <Modal class="modal-cadastro" isOpen={modalEdit}>
        <ModalHeader class="text-center mt-4">Editar Produto</ModalHeader>
        <ModalBody>
          <div class="form-group">
            <label for="id">Id produto</label>
            <input
              type="text"
              class="form-control"
              name="id"
              value={produtoSelected && produtoSelected.id}
              disabled
            ></input>
          </div>
          <div class="form-group mt-3">
            <label for="nome">Nome do produto</label>
            <input
              type="text"
              class="form-control"
              name="nome"
              placeholder="Informe o nome do produto"
              onChange={handleChange}
              value={produtoSelected && produtoSelected.nome}
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
              value={produtoSelected && produtoSelected.valor}
            ></input>
          </div>
          {validation && validation !== '' && (
            <div class="alert alert-warning text-center mt-3" role="alert">
              {validation}
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <button
            class="button button-edit"
            onClick={() => openCloseEditModal(null)}
          >
            Cancelar
          </button>
          <button class="button button-delete" onClick={() => produtoPut()}>
            Atualizar
          </button>
        </ModalFooter>
      </Modal>

      {response && response.status === 200 && (
        <div class="alert alert-success text-center mt-3" role="alert">
          Produto atualizado com sucesso!
        </div>
      )}

      {response && response.status === 400 && (
        <div class="alert alert-warning text-center mt-3" role="alert">
          {response.data.errors.Nome[0] !== ''
            ? response.data.errors.Nome[0]
            : 'Houve um erro ao realizar a solicitação'}
        </div>
      )}
    </div>
  );
};

export default Consulta;
