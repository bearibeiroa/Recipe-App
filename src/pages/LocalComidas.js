import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

function LocalComidas() {
  const [title] = useState('Explorar Origem');
  const [haveSearch] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [recipesBackup, setRecipesBackup] = useState([]);
  const [areas, setAreas] = useState([]);
  const [isRecipesFetch, setIsRecipesFetch] = useState(false);
  const [isAreaFetch, setIsAreaFetch] = useState(false);
  const [selectedArea, setSelectedArea] = useState('');
  const TWELVE = 12;

  async function requestRecipes() {
    const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const result = await request.json();
    setRecipes(result.meals.slice(0, TWELVE));
    setRecipesBackup(result.meals.slice(0, TWELVE));
    setIsRecipesFetch(true);
  }

  async function fetchArea() {
    const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const result = await request.json();
    console.log(result.meals);
    setAreas(result.meals);
    setIsAreaFetch(true);
  }

  async function filterByArea({ target }) {
    setIsRecipesFetch(false);
    if (target.value === 'All') {
      setRecipes(recipesBackup);
      setIsRecipesFetch(true);
    } else {
      const request = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${target.value}`,
      );
      const result = await request.json();
      setRecipes(result.meals.slice(0, TWELVE));
      setIsRecipesFetch(true);
    }
  }

  useEffect(() => {
    fetchArea();
    requestRecipes();
  }, []);

  return (
    <>
      <Header title={ title } haveSearch={ haveSearch } />
      <select
        data-testid="explore-by-area-dropdown"
        value={ selectedArea }
        onChange={ (ev) => {
          setSelectedArea(ev.target.value);
          filterByArea(ev);
        } }
      >
        <option data-testid="All-option" value="All">All</option>
        { isAreaFetch ? areas.map((area, index) => (
          <option
            data-testid={ `${area.strArea}-option` }
            key={ index }
            value={ area.strArea }
          >
            { area.strArea }
          </option>
        )) : null }
      </select>
      { isRecipesFetch ? recipes.map(
        (recipe, index) => (
          <Link to={ `/comidas/${recipe.idMeal}` } key={ index }>
            <RecipeCard key={ index } index={ index } info={ recipe } />
          </Link>),
      ) : <p>Loading...</p> }
      <Footer />
    </>
  );
}

export default LocalComidas;
