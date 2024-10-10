import React, { useState } from 'react';
import Head from 'next/head';

type Usuario = {
  id: number;
  nome: string;
};

export default function GerenciamentoUsuario() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    { id: 1, nome: 'João Silva' },
    { id: 2, nome: 'Maria Souza' },
    { id: 3, nome: 'Carlos Oliveira' },
  ]);

  const handleDelete = (id: number) => {
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
  };

  return (
    <div style={containerStyle}>
      <Head>
        <title>Gerenciamento de Usuários</title>
      </Head>

      {/* Cabeçalho */}
      <header style={headerStyle}>
        <div style={searchContainerStyle}>
          <img src="/icons/search-icon.png" alt="Pesquisar" style={searchIconStyle} /> {/* Ícone de pesquisa */}
          <input type="text" placeholder="Pesquisar usuários" style={searchInputStyle} />
        </div>
        <button style={createUserButtonStyle}>Criar usuário</button>
      </header>

      {/* Conteúdo principal */}
      <main style={mainContentStyle}>
        <ul style={userListStyle}>
          {usuarios.map((usuario) => (
            <li key={usuario.id} style={userItemStyle}>
              <span style={userNameStyle}>{usuario.nome}</span>
              <div>
                <button style={editButtonStyle}>Editar</button>
                <button style={deleteButtonStyle} onClick={() => handleDelete(usuario.id)}>
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>

      <style jsx>{`
        header {
          display: flex;
          align-items: center;
          background-color: rgba(0, 112, 243, 0.8);
          padding: 15px 30px;
          height: 80px;
          border-radius: 10px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
        }

        main {
          padding: 100px 40px;
        }

        ul {
          list-style-type: none;
          padding: 0;
        }

        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          border-bottom: 1px solid #ccc;
        }

        span {
          font-size: 18px;
        }

        button {
          margin-left: 10px;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:active {
          transform: scale(0.95);
        }

        input:focus {
          outline: none;
          box-shadow: 0px 0px 8px rgba(0, 112, 243, 0.6);
        }
        
        button:hover {
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
          transition: box-shadow 0.3s ease;
        }

        input:hover {
          border: 1px solid rgba(0, 112, 243, 0.8);
        }
      `}</style>
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
