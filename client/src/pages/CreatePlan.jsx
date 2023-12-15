import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import styles from '../styles/CreatePlan.module.css';

export function CreatePlan() {

  const [currentWeek, setCurrentWeek] = useState(getMostRecentMonday());

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

  async function logout() {
    const res = await fetch("/registration/logout/", {
      credentials: "same-origin", // include cookies!
    });

    if (res.ok) {
      // navigate away from the single page app!
      window.location = "/registration/sign_in/";
    } else {
      console.error("This was a stupid request");
    }
}

  const goToNextWeek = () => {
      const nextWeek = new Date(currentWeek);
      nextWeek.setDate(currentWeek.getDate() + 7);
      setCurrentWeek(nextWeek);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <span className={styles.navbarTitle}>Meal Deal - Create Plans</span>
        </div>
        <div className={styles.navbarRight}>
            <Link to="/view_plans">
                <button className={styles.navbarButton}>View Plans</button>
            </Link>
            <Link to="/home">
                <button className={styles.navbarButton}>Home</button>
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
                      This is where the meals will go!
                  </div>
              </div>
          </div>
        </section>
    </>
  );
}