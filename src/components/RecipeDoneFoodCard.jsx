import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function RecipeDoneFoodCard({ thumb, category, title, date, tags, area, index }) {
  return (
    <section>
      <img
        src={ thumb }
        alt="Imagem da receita"
        height="200px"
        data-testid={ `${index}-horizontal-image` }
      />
      <p data-testid={ `${index}-horizontal-top-text` }>{ `${area} - ${category}` }</p>
      <h5 data-testid={ `${index}-horizontal-name` }>{ title }</h5>
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
      <button type="button">
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="icone de compartilhar"
        />
      </button>
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
};

export default RecipeDoneFoodCard;
