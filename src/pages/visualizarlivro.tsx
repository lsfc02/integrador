import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function VisualizarLivro() {
  const router = useRouter();
  const { title_id } = router.query;
  const [bookData, setBookData] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    if (title_id) {
      fetchBookData();
      fetchRatings();
      checkUserAuthentication();
    }
  }, [title_id]);

  const fetchBookData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/titles/${title_id}`);
      setBookData(response.data);
    } catch (error) {
      console.error('Erro ao buscar os dados do livro:', error);
    }
  };

  const fetchRatings = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/titles/${title_id}/ratings`);
      setRatings(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar as avaliações:', error);
    }
  };

  const checkUserAuthentication = () => {
    setIsUserAuthenticated(true);
  };

  const handleRatingSubmit = async () => {
    if (isUserAuthenticated) {
      try {
        await axios.post(`http://127.0.0.1:8000/titles/${title_id}/ratings`, {
          rating: userRating,
          comment: userComment,
        });
        fetchRatings();
        setUserRating(0);
        setUserComment("");
      } catch (error) {
        console.error('Erro ao enviar avaliação:', error);
      }
    } else {
      alert("Faça login para avaliar este livro.");
    }
  };

  if (!bookData) return <div>Carregando...</div>;

  return (
    <div style={styles.container}>
      <Head>
        <title>Visualizar Livro</title>
      </Head>

      <header style={styles.header}>
        <img src="/icons/book-icon.png" alt="Biblioteca" style={styles.bookIcon} />
        <div style={styles.searchBar}>Pesquisar livros</div>
      </header>

      <main style={styles.mainContent}>
        <h1 style={styles.title}>Informações do Livro</h1>

        <div style={styles.bookInfo}>
          {bookData.photo && (
            <img src={bookData.photo} alt="Capa do Livro" style={styles.bookImage} />
          )}
          <div>
            <p style={styles.infoText}><strong>ID:</strong> {bookData.title_id}</p>
            <p style={styles.infoText}><strong>Nome:</strong> {bookData.name}</p>
            <p style={styles.infoText}><strong>Ano:</strong> {bookData.year}</p>
            <p style={styles.infoText}><strong>Idioma:</strong> {bookData.language.name}</p>
            <p style={styles.infoText}><strong>Editora:</strong> {bookData.publisher.name}</p>
            <p style={styles.infoText}><strong>Autor:</strong> {bookData.author.name}</p>
            <p style={styles.infoText}><strong>Gênero:</strong> {bookData.genre.name}</p>
            <p style={styles.infoText}><strong>ISBN:</strong> {bookData.isbn}</p>
            <p style={styles.infoText}><strong>Classificação:</strong> {bookData.rate}</p>
          </div>
        </div>

        <h2>Avaliações</h2>
        <div style={styles.ratingsContainer}>
          {ratings.length > 0 ? (
            ratings.map((rating, index) => (
              <div key={index} style={styles.rating}>
                <p><strong>Classificação:</strong> {"⭐".repeat(rating.rating)}</p>
                <p><strong>Comentário:</strong> {rating.comment}</p>
              </div>
            ))
          ) : (
            <p>Sem avaliações ainda.</p>
          )}
        </div>

        {isUserAuthenticated && (
          <div style={styles.ratingForm}>
            <h3>Avalie este livro</h3>
            <div style={styles.starRatingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setUserRating(star)}
                  style={{
                    cursor: "pointer",
                    color: star <= userRating ? "#ffb400" : "#ccc",
                    fontSize: "28px"
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              placeholder="Deixe um comentário"
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              style={styles.commentBox}
            />
            <button onClick={handleRatingSubmit} style={styles.submitButton}>Enviar Avaliação</button>
          </div>
        )}
      </main>
    </div>
  );
}

// Estilos centralizados e modernizados
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 112, 243, 0.9)',
    padding: '15px',
    width: '100%',
    borderRadius: '10px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    top: 0,
    zIndex: 1000,
    height: '100px',
  },
  bookIcon: { width: '50px', height: '50px' },
  searchBar: { fontSize: '16px', color: 'rgba(255, 255, 255, 0.8)', fontStyle: 'italic' },
  mainContent: { padding: '120px 40px', width: '100%', textAlign: 'center' },
  title: { fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' },
  bookInfo: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' },
  bookImage: { width: '150px', height: '200px', borderRadius: '8px', objectFit: 'cover' },
  infoText: { fontSize: '18px', color: '#333' },
  ratingsContainer: { display: 'flex', flexDirection: 'column', gap: '10px', margin: '20px 0' },
  rating: { padding: '15px', backgroundColor: '#f1f1f1', borderRadius: '10px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' },
  ratingForm: { display: 'flex', flexDirection: 'column', gap: '15px', margin: '20px 0', padding: '20px', borderRadius: '10px', backgroundColor: '#f9f9f9', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' },
  starRatingContainer: { fontSize: '24px', display: 'flex', justifyContent: 'center', gap: '5px' },
  commentBox: {
    padding: '10px',
    fontSize: '16px',
    color: '#333',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '5px',
    resize: 'none',
  },
  submitButton: { backgroundColor: '#007BFF', color: 'white', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', border: 'none', fontSize: '16px', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.3s' },
};
