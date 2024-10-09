import React from 'react';
import Head from 'next/head';

export default function Gerenciamento() {
  return (
    <div>
      <Head>
        <title>Gerenciamento de Usuários e Títulos</title>
      </Head>

      {/* Cabeçalho com o mesmo estilo da página inicial */}
      <header style={headerStyle}>
        <div style={leftSectionStyle}>
          <img src="/icons/book-icon.png" alt="Ícone Biblioteca" style={logoStyle} />
        </div>
      </header>

      {/* Barra lateral */}
      <aside style={sidebarStyle}>
        <div>
          <img src="/icons/user-icon.png" alt="Gerenciar Usuário" style={iconStyle} />
          <p style={menuTextStyle}>Gerenciar Usuário</p>
        </div>
        <div>
          <img src="/icons/book-icon.png" alt="Gerenciar Títulos" style={iconStyle} />
          <p style={menuTextStyle}>Gerenciar Títulos</p>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main style={mainContentStyle}>
        {/* Aqui vão as funcionalidades de gerenciamento de usuários e livros */}
      </main>

      {/* Estilos */}
      <style jsx>{`
        /* Estilo do cabeçalho */
        header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: rgba(0, 112, 243, 0.8); /* Azul translúcido */
          padding: 15px 30px;
          height: 80px;
          border-radius: 10px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Sombra sutil */
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
        }

        /* Estilo da barra lateral */
        aside {
          width: 250px;
          background-color: #0055cc; /* Cor similar ao header */
          padding: 20px;
          height: 100vh;
          position: fixed;
          top: 80px; /* Para alinhar com o header */
          left: 0;
        }

        /* Estilo do conteúdo principal */
        main {
          margin-left: 250px;
          padding: 40px;
          height: 100vh;
        }

        /* Estilo dos ícones e texto do menu lateral */
        div {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
        }

        img {
          width: 50px;
          margin-right: 15px;
        }

        p {
          color: white;
          font-size: 18px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

// Definição dos estilos
const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: 'rgba(0, 112, 243, 0.8)', // Azul translúcido
  padding: '15px 30px',
  height: '80px',
  borderRadius: '10px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', // Sombra sutil
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
  width: '90px',
};

const sidebarStyle = {
  width: '250px',
  backgroundColor: '#0055cc', // Azul similar ao header
  padding: '20px',
  height: '100vh',
  position: 'fixed',
  top: '80px', // Para alinhar com o header
  left: 0,
};

const iconStyle = {
  width: '50px',
  marginRight: '15px',
};

const menuTextStyle = {
  color: 'white',
  fontSize: '18px',
  fontWeight: 'bold',
};

const mainContentStyle = {
  marginLeft: '250px',
  padding: '40px',
  height: '100vh',
};
