import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import { makeRequest } from './utils/make_request';

function App() {
  const [randomRecipe, setRandomRecipe] = useState(null);

  function stripHtml(html) {
    // Create a temporary div element
    var tempDivElement = document.createElement("div");
    // Set its HTML to the provided string
    tempDivElement.innerHTML = html;
    // Use the element's text content to get the plain text
    return tempDivElement.textContent || tempDivElement.innerText || "";
  }

  useEffect(() => {
    async function fetchRandomRecipe(query){
      try {
        const responseJson = await makeRequest('/random_recipe/');
    
        if (!responseJson.error) {
          setRandomRecipe(responseJson.recipe.recipes[0]);
        } else {
          console.error(`Failed request. Status code: ${responseJson.status}`);
        }
      } catch (error) {
        console.error('Error fetching random recipe:', error);
      }
    };

    fetchRandomRecipe();
  }, []);

  return (
    <>
      <div className={styles.randomRecipe}>
        <div className={styles.container}>
          {randomRecipe ? (
            <>
              <h2 className={styles.title}>{randomRecipe.title}</h2>
              <p>Dish type: {randomRecipe.dishTypes.map(dish => 
                dish.charAt(0).toUpperCase() + dish.slice(1).toLowerCase()).join(', ')}</p>
              <p>Time to cook: {randomRecipe.readyInMinutes}</p>
              <p className={styles.summary}>{stripHtml(randomRecipe.summary)}</p>
            </>
          ) : (
            // If no random recipe is available yet, display a loading message or spinner
            <p className={styles.loading}>Loading random recipe...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
