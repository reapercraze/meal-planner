import React, { useState, useEffect } from 'react';
import styles from './App.module.css';

function App() {
  const [randomRecipe, setRandomRecipe] = useState(null);

  useEffect(() => {
    const csrfToken = document.cookie.split("; ").find(row => row.startsWith("csrftoken=")).split("=")[1];

    const fetchRandomRecipe = async () => {
      try {
        const response = await fetch('/random_recipe/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          body: JSON.stringify({ query: 'your_query_here' })
        });

        if (response.ok) {
          const data = await response.json();

          setRandomRecipe(data.recipe);
        } else {
          console.error(`Failed to fetch random recipe. Status code: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // fetchRandomRecipe();
  }, []);

  return (
    <>
      <div className={styles.randomRecipe}>
        <div className={styles.container}>
          {randomRecipe ? (
            <>
              <h2 className={styles.title}>{randomRecipe.title}</h2>
              <p>Time to prepare: {randomRecipe.preparationMinutes}</p>
              <p>Time to cook: {randomRecipe.cookingMinutes}</p>
              <p>{randomRecipe.summary}</p>
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
