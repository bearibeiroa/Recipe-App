import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import DetailsCard from '../components/DetailsCard';
import '../App.css';

function ProgressoComidas() {
  const [apiResult, setApiResult] = useState([]);
  const [isChecked, setIsChecked] = useState([{ check: false }]);
  const { id } = useParams();
  const history = useHistory();

  async function fecthWithId() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const result = await response.json();
    setApiResult(result.meals[0]);
  }

  useEffect(() => {
    fecthWithId();
  }, []);

  const handleOnChange = (index) => {
    setIsChecked((currentIndex) => currentIndex.map((item, Itemindex) => {
      if (Itemindex === index) {
        return { ...item };
      }
      return item;
    }));
  };

  function filterIngredients() {
    const ingredients = Object.keys(apiResult);
    const ingredientKeys = ingredients.filter((key) => key.includes('strIngredient'));
    const filteredKeys = ingredientKeys.filter((key) => apiResult[key] !== (null));
    const measure = Object.keys(apiResult);
    const measureKeys = measure.filter((key) => key.includes('strMeasure'));
    const filteredMeasure = measureKeys.filter((key) => apiResult[key] !== (null));
    return filteredKeys.map((ingredient, index) => (
      apiResult[ingredient] === ('') ? null : (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-step` }
          className={ isChecked.check ? 'strike' : '' }
        >
          <input
            type="checkbox"
            checked={ isChecked.check }
            onChange={ () => handleOnChange(index) }
          />
          {`${apiResult[ingredient]} -
          ${apiResult[filteredMeasure[index]] || 'to taste'}`}
        </li>)
    ));
  }

  return (
    <>
      <DetailsCard
        strMealThumb={ apiResult.strMealThumb }
        strMeal={ apiResult.strMeal }
        strCategory={ apiResult.strCategory }
        strInstructions={ apiResult.strInstructions }
        filterIngredients={ filterIngredients() }
      />
      <button
        type="button"
        className="start-recipe-btn"
        data-testid="finish-recipe-btn"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Finalizar Receita
      </button>
    </>
  );
}

export default ProgressoComidas;
