import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router'; // Importa o hook useRouter para redirecionamento

export default function Home() {
  const [isHoverAvaliacoes, setHoverAvaliacoes] = useState(false);
  const [isHoverLogin, setHoverLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false); // Estado para exibir o modal de login
  const router = useRouter(); // Instancia o hook useRouter

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      console.log("Pesquisar:", searchQuery);
    }
  };

  const handleLoginRedirect = () => {
    // Função para redirecionar para a página de gerenciamento após o login
    router.push('/gerenciamento'); 
  };

  return (
    <div>
      <Head>
        {/* Importa a fonte Inter do Google */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Cabeçalho */}
      <header style={headerStyle}>
        <div style={leftSectionStyle} onClick={() => window.location.reload()}>
          <img src="/icons/book-icon.png" alt="Ícone Biblioteca" style={logoStyle} />
          
          <div style={searchContainerStyle}>
            <img src="/icons/search-icon.png" alt="Lupa" style={searchIconStyle} />
            <input 
              type="text" 
              placeholder="Pesquisar Livros, Gênero, Autor" 
              style={searchBarStyle}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              onFocus={(e) => (e.target.style.border = '2px solid #fff')}
              onBlur={(e) => (e.target.style.border = 'none')}
            />
          </div>
        </div>

        <div style={rightSectionStyle}>
          <Link 
            href="/avaliacoes" 
            style={linkStyle} 
            onMouseEnter={() => setHoverAvaliacoes(true)} 
            onMouseLeave={() => setHoverAvaliacoes(false)}
          >
            <div style={linkContentStyle}>
              <img src="/icons/star-icon.png" alt="Avaliações" style={starIconStyle} />
              Avaliações
            </div>
            {isHoverAvaliacoes && <div style={hoverStyle}></div>}
          </Link>
          <div 
            style={linkStyle} 
            onMouseEnter={() => setHoverLogin(true)} 
            onMouseLeave={() => setHoverLogin(false)}
            onClick={() => setShowModal(true)} // Ao clicar, abre o modal de login
          >
            Fazer Login
            {isHoverLogin && <div style={hoverStyle}></div>}
          </div>
        </div>
      </header>
      
      {/* Seção de Livros Mais Avaliados */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Livros mais avaliados..</h2>
        <div style={gridStyle}>
          {[...Array(8)].map((_, index) => (
            <div key={index} style={bookCardStyle} className="book-card">
              {/* Aqui vão as capas dos livros */}
            </div>
          ))}
        </div>
      </section>

      {/* Nova Seção de Livros Mais Emprestados */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Livros mais emprestados..</h2>
        <div style={gridStyle}>
          {[...Array(8)].map((_, index) => (
            <div key={index} style={bookCardStyle} className="book-card">
              {/* Aqui vão as capas dos livros */}
            </div>
          ))}
        </div>
      </section>

      {/* Modal de Login */}
{showModal && (
  <div style={modalOverlayStyle}>
    <div style={blurredBackgroundStyle}></div> {/* Fundo desfocado */}
    <div style={modalLoginContentStyle}>
      <button 
        style={closeButtonStyle} 
        onClick={() => setShowModal(false)}
        onMouseEnter={(e) => e.target.style.color = 'red'}
        onMouseLeave={(e) => e.target.style.color = '#fff'}
      >
        X
      </button>
      <h2 style={loginTitleStyle}>Faça login</h2>
      <input 
        type="text" 
        placeholder="Usuário" 
        style={loginInputStyle} 
        className="login-input"
      />
      <input 
        type="password" 
        placeholder="Senha" 
        style={loginInputStyle} 
        className="login-input"
      />
      <button 
        style={loginIconButtonStyle} 
        className="login-icon-button"
        onClick={handleLoginRedirect} // Função de redirecionamento chamada ao clicar no botão
      >
        <img src="/icons/login-icon.png" alt="Entrar" style={loginIconStyle} />
      </button>
    </div>
  </div>
)}


      <style jsx>{`
        /* Efeito bolha na barra de pesquisa */
        input[type="text"]:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease-in-out;
        }

        /* Efeito bolha nos links de Login e Avaliações */
        a:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease-in-out;
        }

        /* Efeito bolha nos cartões de livros */
        .book-card:hover {
          transform: translateY(-10px);
          transition: transform 0.3s ease-in-out;
          box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
        }

        /* Efeito bolha nos campos de login (Usuário e Senha) */
        .login-input:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease-in-out;
        }

        /* Efeito bolha no botão de login */
        .login-icon-button:hover {
          transform: scale(1.1);
          transition: transform 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}

/* Estilos do cabeçalho */
const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: 'rgba(26, 94, 240, 0.8)', // Azul translúcido (#1A5EF0)
  backdropFilter: 'blur(10px)', // Efeito de vidro fosco
  padding: '15px 30px',
  height: '80px',
  borderRadius: '10px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', // Sombra sutil para profundidade
  position: 'fixed',
  width: '100%',
  top: 0,
  zIndex: 1000,
  fontFamily: 'Inter, sans-serif',
};

/* Estilo para a seção da esquerda (logo e barra de pesquisa) */
const leftSectionStyle = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
};

/* Estilo para a seção da direita (links de Avaliações e Login) */
const rightSectionStyle = {
  display: 'flex',
  alignItems: 'center',
};

/* Estilo do ícone de logo (biblioteca) */
const logoStyle = {
  width: '90px',
  marginRight: '25px',
};

/* Container da barra de pesquisa e ícone de lupa */
const searchContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.2)', // Fundo translúcido
  padding: '8px',
  borderRadius: '10px',
};

/* Estilo do ícone de lupa */
const searchIconStyle = {
  width: '30px',
  marginRight: '10px',
};

/* Estilo da barra de pesquisa */
const searchBarStyle = {
  padding: '10px',
  width: '600px',
  borderRadius: '8px',
  border: 'none',
  fontSize: '16px',
  backgroundColor: 'transparent',
  color: 'white',
  outline: 'none',
  fontFamily: 'Inter, sans-serif',
};

/* Estilo dos links (Avaliações e Login) */
const linkStyle = {
  color: 'white',
  marginLeft: '60px',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '16px',
  position: 'relative',
  transition: 'color 0.3s',
  fontFamily: 'Inter, sans-serif',
};

/* Estilo do conteúdo do link (ícone e texto) */
const linkContentStyle = {
  display: 'flex',
  alignItems: 'center',
};

/* Estilo do ícone da estrela */
const starIconStyle = {
  width: '30px',
  marginRight: '5px',
};

/* Estilo do hover (sublinhado) */
const hoverStyle = {
  position: 'absolute',
  bottom: '-2px',
  left: '0',
  right: '0',
  height: '2px',
  backgroundColor: 'white',
  transition: 'width 0.3s',
  width: '100%',
};

/* Estilos da seção de livros */
const sectionStyle = {
  padding: '20px',
  paddingTop: '100px', // Espaço extra por causa do header fixo
};

/* Título da seção */
const sectionTitleStyle = {
  fontFamily: 'Inter, sans-serif',
  fontSize: '24px',
  fontWeight: '700',
  marginBottom: '20px',
  color: '#fff',
};

/* Estilo do grid de livros */
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '10px',
};

/* Estilo do cartão de livros */
const bookCardStyle = {
  width: '100px',
  height: '150px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)', // Fundo translúcido para os cards
  borderRadius: '10px',
  transition: 'transform 0.3s',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
};

/* Estilo do modal de login */
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1001,
};

/* Fundo desfocado atrás do modal de login */
const blurredBackgroundStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backdropFilter: 'blur(10px)', // Desfoque no fundo
  zIndex: -1, // Para ficar atrás do modal
};

const modalLoginContentStyle = {
  backgroundColor: '#1A5EF0', // Mesma cor da tela inicial
  padding: '20px',
  borderRadius: '10px',
  width: '300px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  zIndex: 1002,
};

const closeButtonStyle = {
  background: 'none',
  color: '#fff',
  border: 'none',
  fontSize: '18px',
  cursor: 'pointer',
  alignSelf: 'flex-end',
};

/* Estilo do título de login */
const loginTitleStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
  color: '#fff', // Cor branca para o título
};

/* Estilo dos inputs do login */
const loginInputStyle = {
  marginBottom: '10px',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '100%',
  fontSize: '16px',
};

const loginIconButtonStyle = {
  backgroundColor: '#0070f3',
  padding: '10px',
  borderRadius: '50%',
  cursor: 'pointer',
};

const loginIconStyle = {
  width: '20px',
  height: '20px',
};
