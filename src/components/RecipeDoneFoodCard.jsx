import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../assets/images/icons/shareIcon.svg';

const copy = require('clipboard-copy');

function RecipeDoneFoodCard({ thumb, category, title, date, tags, area, index, id }) {
  const [copied, setCopied] = useState(false);
  function copyLink() {
    const url = (`http://localhost:3000/comidas/${id}`);
    copy(url);
    setCopied(true);
  }
  return (
    <section>
      <Link to={ `/comidas/${id}` }>
        <img
          src={ thumb }
          alt="Imagem da receita"
          height="200px"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>{ `${area} - ${category}` }</p>
      <Link to={ `/comidas/${id}` }>
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

RecipeDoneFoodCard.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  tags: PropTypes.shape().isRequired,
  area: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  thumb: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default RecipeDoneFoodCard;
