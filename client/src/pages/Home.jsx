import React, { useState, useEffect } from "react";
import styles from '../styles/Home.module.css';

export function Home() {

  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <span className={styles.navbarTitle}>Meal Deal</span>
        </div>
        <div className={styles.navbarRight}>
          <button className={styles.navbarButton}>View Plans</button>
          <button className={styles.navbarButton}>Create Plans</button>
          <button className={styles.navbarButton}>Logout</button>
        </div>
      </nav>
      <section className={styles.container}>
        <div className={styles.info}>
            <h1 className={styles.helloUser}>Hi, User!</h1>
            <p className={styles.date}>Current Date: {dateTime.toLocaleDateString()}</p>

        </div>
      </section>
    </>
  );
}
