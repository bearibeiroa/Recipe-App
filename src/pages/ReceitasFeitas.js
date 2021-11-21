import React, { useState } from 'react';
import Header from '../components/Header';
import RecipeDoneDrinkCard from '../components/RecipeDoneDrinkCard';
import RecipeDoneFoodCard from '../components/RecipeDoneFoodCard';

function ReceitasFeitas() {
  const [title] = useState('Receitas Feitas');
  const [haveSearch] = useState(false);

  function mapDoneRecipes() {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    return recipes.map((recipe, index) => {
      if (recipe.type === 'comida') {
        return (
          <RecipeDoneFoodCard
            key={ index }
            index={ index }
            title={ recipe.name }
            thumb={ recipe.image }
            category={ recipe.category }
            area={ recipe.area }
            date={ recipe.doneDate }
            tags={ recipe.tags }
          />
        );
      }
      return (
        <RecipeDoneDrinkCard
          key={ index }
          index={ index }
          title={ recipe.name }
          thumb={ recipe.image }
          alcoholic={ recipe.alcoholicOrNot }
          date={ recipe.doneDate }
          tags={ recipe.tags }
        />
      );
    });
  }

  return (
    <>
      <Header title={ title } haveSearch={ haveSearch } />
      <main>
        <nav>
          <button type="button" data-testid="filter-by-all-btn">All</button>
          <button type="button" data-testid="filter-by-food-btn">Food</button>
          <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
        </nav>
        <section>
          { mapDoneRecipes() }
        </section>
      </main>
    </>
  );
}

export default ReceitasFeitas;
