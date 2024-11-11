import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function EditBook() {
  const router = useRouter();
  const { title_id } = router.query;

  const [bookData, setBookData] = useState({
    name: '',
    isbn: '',
    year: 0,
    photo: '',
    language_id: 1,
    publisher_id: 1,
    author_id: 1,
    genre_id: 1,
    summary: '',
  });
  const [coverPreview, setCoverPreview] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const genres = [
    { id: 1, name: 'romance' },
    { id: 2, name: 'scifi' },
    { id: 3, name: 'horror' },
    { id: 4, name: 'investigation' },
    { id: 5, name: 'pirate' },
    { id: 6, name: 'fantasy' },
    { id: 7, name: 'comics' },
    { id: 8, name: 'apocalypse' }
  ];

  const languages = [
    { id: 1, name: 'portuguese' },
    { id: 2, name: 'english' },
    { id: 3, name: 'japanese' },
    { id: 4, name: 'italian' },
    { id: 5, name: 'spanish' },
    { id: 6, name: 'chinese' }
  ];

  const apiUrl = `http://127.0.0.1:8000/titles/${title_id}`;

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.status === 200) {
          const book = response.data;
          setBookData({
            name: book.name || '',
            isbn: book.isbn || '',
            year: book.year || 0,
            photo: book.photo || '',
            language_id: book.language_id || 1,
            publisher_id: book.publisher_id || 1,
            author_id: book.author_id || 1,
            genre_id: book.genre_id || 1,
            summary: book.summary || ''
          });
          setCoverPreview(book.photo || '');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do livro:', error);
      }
    };

    if (title_id) {
      fetchBookData();
    }
  }, [title_id]);

  const handleSave = async () => {
    console.log('Salvando dados...');

    try {
      const response = await axios.put(apiUrl, {
        ...bookData,
        year: parseInt(bookData.year) || 0,
        language_id: parseInt(bookData.language_id),
        publisher_id: parseInt(bookData.publisher_id),
        author_id: parseInt(bookData.author_id),
        genre_id: parseInt(bookData.genre_id)
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
      });
      
      if (response.status === 200) {
        setSuccessMessage('Salvo com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao salvar alterações do livro:', error);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        router.push('/visualizarlivro');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLoadCover = () => {
    setCoverPreview(bookData.photo);
  };

  return (
    <div style={containerStyle}>
      <Head>
        <title>Editar Livro</title>
      </Head>

      <header style={headerStyle}>
        <img src="/icons/book-icon.png" alt="Biblioteca" style={bookIconStyle} />
        <div style={searchBarStyle}>Pesquisar livros</div>
      </header>

      <main style={mainContentStyle}>
        <h1 style={titleStyle}>Editar Informações do Livro</h1>

        <div style={bookInfoStyle}>
          <div style={formStyle}>
            <label style={labelStyle}><strong>Título:</strong></label>
            <input
              type="text"
              name="name"
              value={bookData.name}
              placeholder="Título"
              onChange={handleChange}
              style={{ ...inputStyle, color: 'black' }}
            />

            <label style={labelStyle}><strong>Autor:</strong></label>
            <input
              type="number"
              name="author_id"
              value={bookData.author_id}
              placeholder="Autor"
              onChange={handleChange}
              style={{ ...inputStyle, color: 'black' }}
            />

            <label style={labelStyle}><strong>Descrição:</strong></label>
            <input
              type="text"
              name="summary"
              value={bookData.summary}
              placeholder="Descrição"
              onChange={handleChange}
              style={{ ...inputStyle, color: 'black' }}
            />

            <label style={labelStyle}><strong>Gênero:</strong></label>
            <select
              name="genre_id"
              value={bookData.genre_id}
              onChange={handleChange}
              style={{ ...dropdownStyle, color: 'black' }}
            >
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>

            <label style={labelStyle}><strong>Idioma:</strong></label>
            <select
              name="language_id"
              value={bookData.language_id}
              onChange={handleChange}
              style={{ ...dropdownStyle, color: 'black' }}
            >
              {languages.map((language) => (
                <option key={language.id} value={language.id}>
                  {language.name}
                </option>
              ))}
            </select>

            <label style={labelStyle}><strong>Ano:</strong></label>
            <input
              type="number"
              name="year"
              value={bookData.year}
              placeholder="Ano"
              onChange={handleChange}
              style={{ ...inputStyle, color: 'black' }}
            />

            <label style={labelStyle}><strong>ISBN:</strong></label>
            <input
              type="text"
              name="isbn"
              value={bookData.isbn}
              placeholder="ISBN"
              onChange={handleChange}
              style={{ ...inputStyle, color: 'black' }}
            />

            <label style={labelStyle}><strong>Capa (URL):</strong></label>
            <input
              type="text"
              name="photo"
              value={bookData.photo}
              placeholder="URL da Capa"
              onChange={handleChange}
              style={{ ...inputStyle, color: 'black' }}
            />
            <button onClick={handleLoadCover} style={loadCoverButtonStyle}>Carregar capa</button>
          </div>

          <div style={coverPreviewStyle}>
            {coverPreview && (
              <img src={coverPreview} alt="Capa do Livro" style={coverImageStyle} />
            )}
          </div>
        </div>

        <div style={buttonContainerStyle}>
          <button onClick={handleSave} style={saveButtonStyle}>Salvar</button>
        </div>

        {successMessage && (
          <p style={successMessageStyle}>{successMessage}</p>
        )}
      </main>
    </div>
  );
}

// Estilos para os campos
const containerStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center' };
const headerStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(0, 112, 243, 0.8)', padding: '15px', width: '100%', borderRadius: '10px', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', position: 'fixed', top: 0, zIndex: 1000, height: '100px' };
const bookIconStyle = { width: '50px', height: '50px' };
const searchBarStyle = { fontSize: '16px', color: 'rgba(255, 255, 255, 0.8)', fontStyle: 'italic' };
const mainContentStyle = { padding: '120px 40px', width: '100%', textAlign: 'center' };
const titleStyle = { fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' };
const bookInfoStyle = { display: 'flex', gap: '40px', marginBottom: '30px' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px', width: '300px' };
const labelStyle = { textAlign: 'left', fontSize: '16px' };
const inputStyle = { width: '100%', padding: '8px', marginBottom: '15px', fontSize: '16px', color: 'black', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px' };
const dropdownStyle = { width: '100%', padding: '8px', fontSize: '16px', color: 'black', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px' };
const buttonContainerStyle = { display: 'flex', justifyContent: 'center', marginTop: '20px' };
const saveButtonStyle = { backgroundColor: '#0055cc', color: 'white', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' };
const loadCoverButtonStyle = { backgroundColor: '#555', color: 'white', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' };
const coverPreviewStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '300px', height: '450px', border: '1px solid #ccc', borderRadius: '10px', overflow: 'hidden' };
const coverImageStyle = { width: '100%', height: '100%', objectFit: 'cover' };
const successMessageStyle = { color: 'green', fontWeight: 'bold', marginTop: '15px' };
