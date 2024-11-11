import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Gerenciamento() {
  const router = useRouter();

  const irParaUsuarios = () => {
    router.push('/gerenciamentousuarios');
  };

  const irParaLivros = () => {
    router.push('/gerenciamentolivros'); // Novo redirecionamento adicionado
  };

  return (
    <div>
      <Head>
        <title>Gerenciamento</title>
      </Head>

      {/* Cabeçalho */}
      <header style={headerStyle}>
        <div style={leftSectionStyle}>
          <img src="/icons/book-icon.png" alt="Ícone Biblioteca" style={logoStyle} />
        </div>
      </header>

      {/* Barra lateral */}
      <aside style={sidebarStyle}>
        <div style={menuItemStyle} onClick={irParaUsuarios}>
          <span style={emojiStyle}>👤</span> {/* Emoji genérico de usuário */}
          <p style={menuTextStyle}>Gerenciar Usuário</p>
        </div>
        <div style={menuItemStyle} onClick={irParaLivros}> {/* Redirecionamento aqui */}
          <img src="/icons/book-icon.png" alt="Gerenciar Títulos" style={iconStyle} />
          <p style={menuTextStyle}>Gerenciar Títulos</p>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main style={mainContentStyle}>
        <h1>Bem-vindo ao Gerenciamento!</h1>
        <p>Escolha uma das opções no menu ao lado.</p>
      </main>

      <style jsx>{`
        header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: rgba(0, 112, 243, 0.9); /* Azul translúcido com mais opacidade */
          padding: 15px 30px;
          height: 80px;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Sombra mais suave */
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
        }

        aside {
          width: 250px;
          background-color: #0055cc;
          padding: 20px;
          height: 100vh;
          position: fixed;
          top: 80px;
          left: 0;
          display: flex;
          flex-direction: column;
        }

        main {
          margin-left: 250px;
          padding: 40px;
          height: calc(100vh - 80px);
          padding-top: 120px;
        }

        div {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          cursor: pointer;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          padding: 10px;
          border-radius: 8px;
        }

        div:hover {
          background-color: #003399; /* Cor ao passar o mouse */
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Sombra ao passar o mouse */
        }

        img {
          width: 40px;
          margin-right: 15px;
        }

        span {
          font-size: 40px;
          margin-right: 15px;
        }

        p {
          color: white;
          font-size: 18px;
          font-weight: bold;
          margin: 0;
        }
      `}</style>
    </div>
  );
}

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: 'rgba(0, 112, 243, 0.9)',
  padding: '15px 30px',
  height: '80px',
  borderRadius: '10px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  position: 'fixed',
  width: '100%',
  top: 0,
  zIndex: 1000,
};

const leftSectionStyle = {
  display: 'flex',
  alignItems: 'center',
};

const logoStyle = {
  width: '70px',
};

const sidebarStyle = {
  width: '250px',
  backgroundColor: '#0055cc',
  padding: '20px',
  height: '100vh',
  position: 'fixed',
  top: '80px',
  left: 0,
  display: 'flex',
  flexDirection: 'column',
};

const menuItemStyle = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '10px',
  borderRadius: '8px',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
};

const iconStyle = {
  width: '40px',
  marginRight: '15px',
};

const emojiStyle = {
  fontSize: '40px',
  marginRight: '15px',
};

const menuTextStyle = {
  color: 'white',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: 0,
};

const mainContentStyle = {
  marginLeft: '250px',
  padding: '40px',
  height: 'calc(100vh - 80px)',
  paddingTop: '120px',
};
