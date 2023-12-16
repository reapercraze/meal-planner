import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import styles from '../styles/Home.module.css';
import { makeRequest } from '../utils/make_request';

export function Home() {

  const [dateTime, setDateTime] = useState(new Date());
  const [user, setUser] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    getUser();
    return () => clearInterval(intervalId);
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

  async function getUser() {
    try {
      const responseJson = await makeRequest('/me/');
  
      if (!responseJson.error) {
        setUser(responseJson.user.first_name + " " + responseJson.user.last_name);
      } else {
        console.error(`Failed request. Status code: ${responseJson.status}`);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <span className={styles.navbarTitle}>Meal Deal - Home</span>
        </div>
        <div className={styles.navbarRight}>
            <Link to="/view_plans">
                <button className={styles.navbarButton}>View Plans</button>
            </Link>
            <Link to="/create_plan">
                <button className={styles.navbarButton}>Create Plans</button>
            </Link>
          <button className={styles.navbarButton} onClick={logout}>Logout</button>
        </div>
      </nav>
      <section className={styles.container}>
        <div className={styles.info}>
            <h1 className={styles.helloUser}>Hi, {user}!</h1>
            <p className={styles.date}>
                Today's Date: {dateTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <div className={styles.meal}>
                This is where today's meals will go
            </div>
        </div>
      </section>
    </>
  );
}
