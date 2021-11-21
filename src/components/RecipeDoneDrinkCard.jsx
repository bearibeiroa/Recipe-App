import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function RecipeDoneDrinkCard({ thumb, alcoholic, title, date, tags, index, id }) {
  const [copied, setCopied] = useState(false);
  function copyLink() {
    const url = (`http://localhost:3000/bebidas/${id}`);
    copy(url);
    setCopied(true);
  }
  return (
    <section>
      <Link to={ `/bebidas/${id}` }>
        <img
          src={ thumb }
          alt="Imagem da receita"
          height="200px"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>{ alcoholic }</p>
      <Link to={ `/bebidas/${id}` }>
        <h5 data-testid={ `${index}-horizontal-name` }>{ title }</h5>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>
        Done in:
        { ' ' }
        { date }
      </p>
      { tags.map((tag, i) => (
        <p key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>
          { tag }
        </p>
      ))}
      <button type="button" onClick={ copyLink }>
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="icone de compartilhar"
        />
      </button>
      { copied && <p>Link copiado!</p> }
    </section>
  );
}

RecipeDoneDrinkCard.propTypes = {
  alcoholic: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  tags: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  thumb: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default RecipeDoneDrinkCard;
