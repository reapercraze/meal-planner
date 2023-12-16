import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import styles from '../styles/ViewRecipes.module.css';
import { makeRequest } from '../utils/make_request';

export function ViewRecipes() {
    const [currentDay, setCurrentDay] = useState(null);
    const [ecipes, setRecipes] = useState([]);
  
    useEffect(() => {
      getRecipes();
    }, []);
    
  
    async function logout() {
      const res = await fetch("/registration/logout/", {
        credentials: "same-origin", // include cookies!
      });
  
      if (res.ok) {
        // navigate away from the single page app!
        window.location = "/registration/sign_in/";
      } else {
        console.error("This was a stupid request")
      }
    }
  
    async function getRecipes() {
      try {
        const responseJson = await makeRequest('/get_recipes/');
    
        if (!responseJson.error) {
          setRecipe(responseJson.recipe.recipes);
        } else {
          console.error(`Failed request. Status code: ${responseJson.status}`);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
  
    return (
      <>
        <nav className={styles.navbar}>
          <div className={styles.navbarLeft}>
            <span className={styles.navbarTitle}>Meal Deal - View Plans</span>
          </div>
          <div className={styles.navbarRight}>
              <Link to="/home">
                  <button className={styles.navbarButton}>Home</button>
              </Link>
              <Link to="/create_plan">
                  <button className={styles.navbarButton}>Create Plans</button>
              </Link>
            <button className={styles.navbarButton} onClick={logout}>Logout</button>
          </div>
        </nav>
        <section className={styles.container}>
          <div className={styles.info}>
            <h1 className={styles.title}>Recipes</h1>
            <div className={styles.meal}>
              {/* Display the recipes*/}
              <div className={styles.weekDisplay}>
                <button onClick={goToPreviousWeek} className={styles.weekButton}>&lt;</button>
                {`${currentWeek.toLocaleDateString()} - ${new Date(currentWeek.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString()}`}
                <button onClick={goToNextWeek} className={styles.weekButton}>&gt;</button>
              </div>
              <div className={styles.mealDisplay}>
                {mealWeeks.length > 0 ? (
                  mealWeeks.map((mealWeek) => (
                    <div key={mealWeek.id} className={styles.mealPlan} onClick={() => handleMealPlanClick(mealWeek)}>
                      <h2>{mealWeek.title}</h2>
                      <div className={styles.daysContainer}>
                        {mealWeek.days.map((day, index) => (
                          <div key={index} className={styles.dayBox} onClick={(e) => handleDayBoxClick(e, mealWeek, day)}>
                            <h3>{getDayOfWeek(index)}</h3>
                            <div className={styles.mealsContainer}>
                              <p>Breakfast: {day.breakfast}</p>
                              <p>Lunch: {day.lunch}</p>
                              <p>Dinner: {day.dinner}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  // if there are no plans available for the week
                  <div>
                    <p className={styles.errorMessage}>Uh oh! Looks like you don't have a plan for this week!</p>
                    <button onClick={createNewWeek} className={styles.createPlanButton}>Create Plan</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
  