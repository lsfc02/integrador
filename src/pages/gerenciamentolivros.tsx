import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';

type Livro = {
  id: number;
  title_id: number;
  name: string;
};

export default function GerenciamentoLivro() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<number | null>(null);
  const router = useRouter();
  
  const apiUrl = 'http://127.0.0.1:8000/titles';
  const limit = 100;

  useEffect(() => {
    const obterToken = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/auth/login', {
          username: 'admin',
          password: 'abc123',
        });

        if (response.status === 200 && response.data.token) {
          setToken(response.data.token);
        }
      } catch (error) {
        console.error('Erro ao obter o token:', error);
      }
    };
    obterToken();
  }, []);

  useEffect(() => {
    if (token && searchQuery) {
      carregarLivros();
    }
  }, [token, searchQuery, page]);

  const carregarLivros = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          name: searchQuery,
          page: page,
          limit: limit,
        },
      });

      if (response.status === 200) {
        setLivros(response.data.data);
        setTotalPages(response.data.total_pages);
      }
    } catch (error) {
      console.error('Erro ao carregar livros:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  // Corrigindo a função handleEdit para passar corretamente o title_id
  const handleEdit = (title_id: number) => {
    router.push(`/editarlivro?title_id=${title_id}`);
  };

  const handleDelete = (id: number) => {
    setBookToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (bookToDelete === null) return;

    try {
      await axios.delete(`${apiUrl}/${bookToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLivros(livros.filter((livro) => livro.id !== bookToDelete));
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
    } finally {
      setShowDeleteConfirm(false);
      setBookToDelete(null);
    }
  };

  const loadMoreBooks = () => {
    if (!isLoading && page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    if (page > 1 && searchQuery) {
      carregarLivros();
    }
  }, [page]);

  return (
    <div style={containerStyle}>
      <Head>
        <title>Gerenciamento de Livros</title>
      </Head>

      <header style={headerStyle}>
        <div style={searchContainerStyle}>
          <img src="/icons/search-icon.png" alt="Pesquisar" style={searchIconStyle} />
          <input
            type="text"
            placeholder="Pesquisar livros"
            style={searchInputStyle}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <button style={createBookButtonStyle} onClick={() => router.push('/criarlivro')}>
          Criar livro
        </button>
      </header>

      <main style={mainContentStyle}>
        <ul style={bookListStyle}>
          {livros.length > 0 ? (
            livros.map((livro) => (
              <li key={livro.id} style={bookItemStyle}>
                <span style={bookTitleStyle}>{livro.name}</span>
                <div>
                  {/* Usando title_id corretamente no botão "Editar" */}
                  <button style={editButtonStyle} onClick={() => handleEdit(livro.title_id)}>
                    Editar
                  </button>
                  <button style={deleteButtonStyle} onClick={() => handleDelete(livro.title_id)}>
                    Excluir
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li style={bookItemStyle}>Nenhum livro encontrado.</li>
          )}
        </ul>

        {isLoading && <p>Carregando...</p>}

        {showDeleteConfirm && (
          <div style={confirmOverlayStyle}>
            <div style={confirmBoxStyle}>
              <p>Você tem certeza que quer excluir o livro?</p>
              <button style={confirmButtonStyle} onClick={confirmDelete}>
                Sim
              </button>
              <button style={cancelButtonStyle} onClick={() => setShowDeleteConfirm(false)}>
                Não
              </button>
            </div>
          </div>
        )}
      </main>

      <div style={{ height: '20px', background: '#f1f1f1' }} onClick={loadMoreBooks}></div>
    </div>
  );
}


// Estilos

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: 'rgba(0, 112, 243, 0.8)',
  padding: '15px 30px',
  width: '100%',
  borderRadius: '10px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  position: 'fixed',
  top: 0,
  zIndex: 1000,
};

const searchContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  flex: 1,
};

const searchIconStyle = {
  width: '25px',
  height: '25px',
  marginRight: '10px',
};

const searchInputStyle = {
  flex: 1,
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  color: '#000',
};

const createBookButtonStyle = {
  backgroundColor: '#0055cc',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  marginLeft: '15px',
  cursor: 'pointer',
  boxShadow: '0px 0px 8px rgba(0, 112, 243, 0.4)',
  transition: 'box-shadow 0.3s ease',
};

const mainContentStyle = {
  padding: '120px 40px',
  width: '100%',
};

const bookListStyle = {
  listStyleType: 'none',
  padding: 0,
};

const bookItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px',
  marginBottom: '10px',
  borderBottom: '1px solid #ccc',
};

const bookTitleStyle = {
  fontSize: '18px',
};

const editButtonStyle = {
  backgroundColor: '#0055cc',
  color: 'white',
  padding: '10px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'box-shadow 0.3s ease',
};

const deleteButtonStyle = {
  backgroundColor: '#e74c3c',
  color: 'white',
  padding: '10px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'box-shadow 0.3s ease',
};

const confirmOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const confirmBoxStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
};

const confirmButtonStyle = {
  backgroundColor: '#e74c3c',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  marginRight: '10px',
  cursor: 'pointer',
};

const cancelButtonStyle = {
  backgroundColor: '#ccc',
  color: '#333',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
};
