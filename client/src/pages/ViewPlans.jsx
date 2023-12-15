import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import styles from '../styles/ViewPlans.module.css';
import { makeRequest } from '../utils/make_request';

export function ViewPlans() {
  const [currentWeek, setCurrentWeek] = useState(getMostRecentMonday());
  const [mealWeeks, setMealWeeks] = useState([]);

  useEffect(() => {
    fetchMealPlans();
  }, [currentWeek]);

  async function fetchMealPlans() {
    try {
      const responseJson = await makeRequest('/get_meal_plan/', 'POST', {
        currentWeek: currentWeek.toISOString()
      });
  
      console.log('Response:', responseJson);
  
      if (!responseJson.error) {
        setMealWeeks(responseJson.meal_weeks);
      } else {
        console.error(`Failed request. Status code: ${responseJson.status}`);
      }
    } catch (error) {
      console.error('Error fetching meal weeks:', error);
    }
  }
  
  
  

  async function createNewWeek() {
    // Prompt the user for the week title
    const weekTitle = window.prompt('Enter the name of the week:', 'New Week');
  
    if (weekTitle === null) {
      // User clicked Cancel
      return;
    }
  
    const csrfToken = document.cookie.split("; ").find(row => row.startsWith("csrftoken=")).split("=")[1];
  
    try {
      const response = await fetch('/create_meal_week/', {
        credentials: "same-origin",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({
          title: weekTitle,
    })
  })
    
      
      if (!response.error) {
        setMealWeeks([...mealWeeks, response.meal_week]);
      } else {
        console.error(`Failed request. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Error Failed to create a new week:', error);
    }
  }
  

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

  function getMostRecentMonday() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const difference = (dayOfWeek + 6) % 7; // Calculate difference to Monday
    const mostRecentMonday = new Date(today);
    mostRecentMonday.setDate(today.getDate() - difference);
    return mostRecentMonday;
  }

  const goToPreviousWeek = () => {
    const previousWeek = new Date(currentWeek);
    previousWeek.setDate(currentWeek.getDate() - 7);
    setCurrentWeek(previousWeek);
  };

  const goToNextWeek = () => {
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(currentWeek.getDate() + 7);
    setCurrentWeek(nextWeek);
  };

  async function getRecipe() {
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
          <h1 className={styles.title}>Your Meal Plans</h1>
          <div className={styles.meal}>
            {/* Display the current week */}
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
