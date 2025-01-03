import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';

type Usuario = {
  user_id: number;
  display_name: string;
};

export default function GerenciamentoUsuario() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [token, setToken] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const router = useRouter();

  const apiUrl = 'http://127.0.0.1:8000/users';

  useEffect(() => {
    const obterToken = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/auth/login', {
          username: 'admin',
          password: 'abc123',
        });

        if (response.status === 200 && response.data.token) {
          setToken(response.data.token);
          if (searchQuery) {
            buscarUsuarios();
          }
        }
      } catch (error) {
        console.error('Erro ao obter o token:', error);
      }
    };

    obterToken();
  }, [searchQuery]);

  const buscarUsuarios = async () => {
    try {
      const params = { display_name: searchQuery, page: 1, limit: 20 };
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: params,
      });

      if (response.status === 200) {
        setUsuarios(response.data.data);
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const handleEdit = (user_id: number) => {
    router.push(`/editarusuario/${user_id}`);
  };

  const handleDelete = (user_id: number) => {
    setUserToDelete(user_id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (userToDelete === null) return;

    try {
      await axios.delete(`${apiUrl}/${userToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Atualiza a lista de usuários e fecha o modal após exclusão
      setUsuarios(usuarios.filter((usuario) => usuario.user_id !== userToDelete));
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    } finally {
      setShowDeleteConfirm(false);  // Fecha o modal sempre, mesmo se houver erro
      setUserToDelete(null);
    }
  };

  return (
    <div style={containerStyle}>
      <Head>
        <title>Gerenciamento de Usuários</title>
      </Head>

      <header style={headerStyle}>
        <div style={searchContainerStyle}>
          <img src="/icons/search-icon.png" alt="Pesquisar" style={searchIconStyle} />
          <input
            type="text"
            placeholder="Pesquisar usuários"
            style={{ ...searchInputStyle, color: '#555' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchQuery && buscarUsuarios()}
          />
        </div>
        <button style={createUserButtonStyle} onClick={() => router.push('/criarusuario')}>
          Criar usuário
        </button>
      </header>

      <main style={mainContentStyle}>
        <ul style={userListStyle}>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <li key={usuario.user_id} style={userItemStyle}>
                <span style={userNameStyle}>{usuario.display_name || 'Nome não disponível'}</span>
                <div>
                  <button style={editButtonStyle} onClick={() => handleEdit(usuario.user_id)}>
                    Editar
                  </button>
                  <button style={deleteButtonStyle} onClick={() => handleDelete(usuario.user_id)}>
                    ✕
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li style={userItemStyle}>Nenhum usuário encontrado.</li>
          )}
        </ul>
        {showDeleteConfirm && (
          <div style={confirmOverlayStyle}>
            <div style={confirmBoxStyle}>
              <p>Você tem certeza que quer excluir o usuário?</p>
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

const createUserButtonStyle = {
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

const userListStyle = {
  listStyleType: 'none',
  padding: 0,
};

const userItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px',
  marginBottom: '10px',
  borderBottom: '1px solid #ccc',
};

const userNameStyle = {
  fontSize: '18px',
};

const editButtonStyle = {
  backgroundColor: '#0055cc',
  color: 'white',
  padding: '10px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginRight: '5px',
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
