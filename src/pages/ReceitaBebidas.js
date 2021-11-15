/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ButtonRecipeDetails from '../components/ButtonRecipeDetails';
import DetailsCard from '../components/DetailsCard';
import RecomendationCard from '../components/RecomendationCard';

function ReceitaBebidas() {
  const [apiDrinkRecipe, setApiDrinkRecipe] = useState([]);
  const { id } = useParams();

  async function fecthWithId() {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const result = await response.json();
    setApiDrinkRecipe(result.drinks[0]);
  }

  useEffect(() => {
    fecthWithId();
  }, []);

  function filterIngredients() {
    const ingredients = Object.keys(apiDrinkRecipe);
    const ingredientKeys = ingredients.filter((key) => key.includes('strIngredient'));
    const measure = Object.keys(apiDrinkRecipe);
    const measureKeys = measure.filter((key) => key.includes('strMeasure'));

    return ingredientKeys.map((ingredient, index) => (
      apiDrinkRecipe[ingredient] === null || apiDrinkRecipe[ingredient] === '' ? null : (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${apiDrinkRecipe[ingredient]} - ${apiDrinkRecipe[measureKeys[index]]}`}
        </li>)
    ));
  }

  return (
    <main>
      { apiDrinkRecipe && <DetailsCard
        strMealThumb={ apiDrinkRecipe.strDrinkThumb }
        strMeal={ apiDrinkRecipe.strDrink }
        strCategory={ apiDrinkRecipe.strAlcoholic }
        strInstructions={ apiDrinkRecipe.strInstructions }
        filterIngredients={ filterIngredients() }
      />}
      <RecomendationCard />
      <ButtonRecipeDetails
        title="Iniciar Receita"
      />
    </main>
  );
}

export default ReceitaBebidas;
