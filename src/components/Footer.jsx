import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../App.css';
import AppContext from '../context/AppContext';

function Footer() {
  const { setBtnFilterCategory, setBtnFilterCategoryDrinks } = useContext(AppContext);
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/bebidas" onClick={ () => setBtnFilterCategoryDrinks(true) }>
        <img src={ drinkIcon } data-testid="drinks-bottom-btn" alt="Icone de drink" />
      </Link>
      <Link to="/explorar">
        <img src={ exploreIcon } data-testid="explore-bottom-btn" alt="Explorar" />
      </Link>
      <Link to="/comidas" onClick={ () => setBtnFilterCategory(true) }>
        <img src={ mealIcon } data-testid="food-bottom-btn" alt="Icone de comidas" />
      </Link>
    </footer>
  );
}

export default Footer;
