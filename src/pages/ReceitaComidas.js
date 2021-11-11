import React from 'react';

function ReceitaComidas() {
  return (
    <main>
      <img data-testid="recipe-photo" src="{ thumb }" alt="Imagem da receita" />
      <h1 data-testid="recipe-title">Title</h1>
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Fav</button>
      <h5 data-testid="recipe-category">Category</h5>
    </main>
  );
}

export default ReceitaComidas;
