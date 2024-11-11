import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function CriarUsuario() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    usuario: '',
    nome: '',
    descricao: '',
    senha: '',
    cargo: '',
  });
  const [token, setToken] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getRoleId = (cargo) => {
    switch (cargo) {
      case 'Admin':
        return 1;
      case 'Bibliotecário':
        return 2;
      case 'Usuário':
        return 3;
      default:
        return 0;
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/login', {
        username: 'admin',
        password: 'abc123',
      });

      if (response.status === 200 && response.data.token) {
        setToken(response.data.token);
        return response.data.token;
      } else {
        alert('Falha no login.');
        return null;
      }
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Erro ao autenticar.');
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let currentToken = token;
    if (!currentToken) {
      currentToken = await handleLogin();
    }

    if (!currentToken) {
      alert('Erro de autenticação. Não foi possível criar o usuário.');
      return;
    }

    const requestData = {
      username: formData.usuario,
      display_name: formData.nome,
      password: formData.senha,
      description: formData.descricao,
      role_id: getRoleId(formData.cargo),
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/users', requestData, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });

      if (response.status === 201) {
        alert('Usuário criado com sucesso!');
        router.push('/gerenciamentousuarios');  // Redireciona para a página de gerenciamento
      } else {
        console.error('Erro ao redirecionar para a página de gerenciamento.');
        alert('Erro ao redirecionar para a página de gerenciamento.');
      }
    } catch (error) {
      console.error('Erro na criação do usuário:', error);
      alert('Erro ao criar o usuário.');
    }
  };
  
  return (
    <div style={containerStyle}>
      <Head>
        <title>Criar Usuário</title>
      </Head>

      <header style={headerStyle}>
        <img src="/icons/book-icon.png" alt="Biblioteca" style={bookIconStyle} />
      </header>

      <main style={mainContentStyle}>
        <h1 style={titleStyle}>Criar Usuário</h1>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="text"
            name="usuario"
            placeholder="Usuário"
            value={formData.usuario}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="text"
            name="descricao"
            placeholder="Descrição"
            value={formData.descricao}
            onChange={handleChange}
            style={inputStyle}
          />
          <select
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
            style={dropdownStyle}
            required
          >
            <option value="" disabled>
              Selecione o Cargo
            </option>
            <option value="Admin">Admin</option>
            <option value="Bibliotecário">Bibliotecário</option>
            <option value="Usuário">Usuário</option>
          </select>
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <button type="submit" style={submitButtonStyle}>
            Criar Usuário
          </button>
        </form>
      </main>

      <style jsx>{`
        header {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 112, 243, 0.8);
          padding: 15px;
          height: 100px;
          border-radius: 10px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
        }

        main {
          padding: 150px 40px;
        }

        input:focus,
        select:focus {
          outline: none;
          box-shadow: 0px 0px 8px rgba(0, 112, 243, 0.6);
          transition: all 0.3s ease;
        }

        button:active {
          transform: scale(0.95);
        }

        button:hover {
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
          transition: box-shadow 0.3s ease;
        }

        input:hover,
        select:hover {
          border: 1px solid rgba(0, 112, 243, 0.8);
          transition: border 0.3s ease;
        }
      `}</style>
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 112, 243, 0.8)',
  padding: '15px',
  width: '100%',
  borderRadius: '10px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  position: 'fixed',
  top: 0,
  zIndex: 1000,
  height: '100px',
};

const bookIconStyle = {
  width: '50px',
  height: '50px',
};

const mainContentStyle = {
  padding: '120px 40px',
  width: '100%',
  textAlign: 'center',
};

const titleStyle = {
  fontSize: '28px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  alignItems: 'center',
};

const inputStyle = {
  padding: '15px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '100%',
  maxWidth: '500px',
  transition: 'all 0.3s ease',
  color: '#000',
  fontFamily: 'Arial, sans-serif',
};

const dropdownStyle = {
  padding: '15px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '100%',
  maxWidth: '500px',
  transition: 'all 0.3s ease',
  color: '#000',
  fontFamily: 'Arial, sans-serif',
};

const submitButtonStyle = {
  backgroundColor: '#0055cc',
  color: 'white',
  padding: '15px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  boxShadow: '0px 0px 8px rgba(0, 112, 243, 0.4)',
  transition: 'box-shadow 0.3s ease',
};
