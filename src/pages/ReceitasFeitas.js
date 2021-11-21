import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import RecipeDoneDrinkCard from '../components/RecipeDoneDrinkCard';
import RecipeDoneFoodCard from '../components/RecipeDoneFoodCard';

function ReceitasFeitas() {
  const [title] = useState('Receitas Feitas');
  const [haveSearch] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const recipesLS = JSON.parse(localStorage.getItem('doneRecipes'));

  function getRecipes() {
    setRecipes(recipesLS);
  }

  useEffect(() => {
    getRecipes();
  }, []);

  function filterByFood() {
    const foodRecipes = recipesLS.filter((recipe) => recipe.type === 'comida');
    setRecipes(foodRecipes);
  }

  function filterByDrink() {
    const foodRecipes = recipesLS.filter((recipe) => recipe.type === 'bebida');
    setRecipes(foodRecipes);
  }

  function mapDoneRecipes() {
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
            id={ recipe.id }
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
          id={ recipe.id }
        />
      );
    });
  }

  return (
    <>
      <Header title={ title } haveSearch={ haveSearch } />
      <main>
        <nav>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ getRecipes }
          >
            All
          </button>
          <button
            type="button"
            onClick={ filterByFood }
            data-testid="filter-by-food-btn"
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ filterByDrink }
          >
            Drinks
          </button>
        </nav>
        <section>
          { mapDoneRecipes() }
        </section>
      </main>
    </>
  );
}

export default ReceitasFeitas;
