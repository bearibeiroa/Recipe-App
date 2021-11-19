import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
// import AppContext from '../context/AppContext';

function Perfil() {
  const [title] = useState('Perfil');
  const [haveSearch] = useState(false);
  // const { userEmail } = useContext(AppContext);
  const mail = localStorage.getItem('user');

  return (
    <>
      <Header title={ title } haveSearch={ haveSearch } />
      <h3 data-testid="profile-email">{ mail && JSON.parse(mail).email }</h3>
      <Link to="/receitas-feitas">
        <button type="button" data-testid="profile-done-btn">Receitas Feitas</button>
      </Link>
      <Link to="/receitas-favoritas">
        <button type="button" data-testid="profile-favorite-btn">
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </button>
      </Link>
      <Footer />
    </>
  );
}

export default Perfil;
