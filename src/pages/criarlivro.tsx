import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function CriarLivro() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    titulo: '',
    ano: '',
    summary: '',
    genero: '',
    autor: '',
    editora: '',
    idioma: '',
    isbn: '',
    coverUrl: '', // Novo campo para a URL da capa
  });
  const [token, setToken] = useState('');
  const [coverPreview, setCoverPreview] = useState(null); // Estado para pré-visualização da capa

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Atualiza a pré-visualização da capa ao alterar o campo de URL da capa
    if (name === 'coverUrl') {
      setCoverPreview(value);
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
      alert('Erro de autenticação. Não foi possível criar o livro.');
      return;
    }

    const requestData = {
      name: formData.titulo,
      isbn: formData.isbn,
      year: parseInt(formData.ano, 10),
      photo: formData.coverUrl, // Envia a URL da capa
      language_id: parseInt(formData.idioma, 10),
      publisher_id: 1,
      author_id: 1,
      genre_id: parseInt(formData.genero, 10),
      summary: formData.summary,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/titles', requestData, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });

      if (response.status === 201) {
        alert('Livro criado com sucesso!');
        router.push(`/gerenciamentolivros`);
      } else {
        alert('Erro ao redirecionar para a página de visualização.');
      }
    } catch (error) {
      console.error('Erro na criação do livro:', error);
      alert('Erro ao criar o livro.');
    }
  };

  return (
    <div style={containerStyle}>
      <Head>
        <title>Criar Livro</title>
      </Head>

      <header style={headerStyle}>
        <img src="/icons/book-icon.png" alt="Biblioteca" style={bookIconStyle} />
      </header>

      <main style={mainContentStyle}>
        <h1 style={titleStyle}>Criar Livro</h1>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="text"
            name="titulo"
            placeholder="Título do Livro"
            value={formData.titulo}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="text"
            name="ano"
            placeholder="Ano"
            value={formData.ano}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="text"
            name="summary"
            placeholder="Sumário"
            value={formData.summary}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <select
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            style={dropdownStyle}
            required
          >
            <option value="" disabled>Selecione o Gênero</option>
            <option value="1">Romance</option>
            <option value="2">Sci-Fi</option>
            <option value="3">Horror</option>
            <option value="4">Investigation</option>
            <option value="5">Pirate</option>
            <option value="6">Fantasy</option>
            <option value="7">Comics</option>
            <option value="8">Apocalypse</option>
          </select>
          <input
            type="text"
            name="autor"
            placeholder="Autor"
            value={formData.autor}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="text"
            name="editora"
            placeholder="Editora"
            value={formData.editora}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <select
            name="idioma"
            value={formData.idioma}
            onChange={handleChange}
            style={dropdownStyle}
            required
          >
            <option value="" disabled>Selecione o Idioma</option>
            <option value="1">Portuguese</option>
            <option value="2">English</option>
            <option value="3">Japanese</option>
            <option value="4">Italian</option>
            <option value="5">Spanish</option>
            <option value="6">Chinese</option>
          </select>
          <input
            type="text"
            name="isbn"
            placeholder="ISBN"
            value={formData.isbn}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            type="text"
            name="coverUrl"
            placeholder="URL da Capa"
            value={formData.coverUrl}
            onChange={handleChange}
            style={inputStyle}
          />
          {coverPreview && (
            <img
              src={coverPreview}
              alt="Pré-visualização da capa"
              style={coverPreviewStyle}
            />
          )}
          <button type="submit" style={submitButtonStyle}>
            Criar Livro
          </button>
        </form>
      </main>
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
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '100%',
  maxWidth: '500px',
  color: '#000',
  fontFamily: 'Arial, sans-serif',
};

const submitButtonStyle = {
  padding: '15px 30px',
  fontSize: '16px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: 'rgba(0, 112, 243, 0.8)',
  color: '#fff',
  cursor: 'pointer',
  fontFamily: 'Arial, sans-serif',
};

const coverPreviewStyle = {
  marginTop: '15px',
  width: '200px',
  height: '300px',
  objectFit: 'cover',
  borderRadius: '5px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
};
