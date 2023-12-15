import React, { useState, useEffect } from 'react';
import styles from './App.module.css';

function App() {
  const [randomRecipe, setRandomRecipe] = useState(null);

  useEffect(() => {
    // Retrieve CSRF token from cookies
    const csrfToken = document.cookie.split("; ").find(row => row.startsWith("csrftoken=")).split("=")[1];

    // Define an async function to fetch the random recipe
    const fetchRandomRecipe = async () => {
      try {
        // Make a request to the Django backend's random_recipe endpoint using fetch
        const response = await fetch('/random_recipe/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,  // Include the CSRF token in the headers
          },
          body: JSON.stringify({ query: 'your_query_here' }), // Add any necessary parameters
        });

        // Check if the request was successful (status code 200)
        if (response.ok) {
          // Parse the response JSON
          const data = await response.json();

          // Update the component state with the received recipe data
          setRandomRecipe(data.recipe);
        } else {
          // If the request was not successful, log an error message
          console.error(`Failed to fetch random recipe. Status code: ${response.status}`);
        }
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };

    // Call the async function to fetch the random recipe when the component mounts
    // fetchRandomRecipe();
  }, []);  // The empty dependency array ensures the effect runs only once when the component mounts

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
