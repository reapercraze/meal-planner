import React from "react";
import styles from '../styles/About.module.css';

export function About() {

  async function sign_in() {
    const res = await fetch("/registration/sign_in/", {
      credentials: "same-origin", // include cookies!
    });
    if (res.ok) {
      window.location = "/registration/sign_in"
    } else {
      console.error('Failed to fetch data');
    }
  }

  async function sign_up() {
    const res = await fetch("/registration/sign_up/", {
      credentials: "same-origin", // include cookies!
    });
    if (res.ok) {
      window.location = "/registration/sign_up/"
    } else {
      console.error('Failed to fetch data');
    }
  }

  return (
    <div className={styles.about}>
      <span className={styles.title}>Meal Deal</span>
      <div className={styles.masterContainer}>
        <div className={styles.textContainer}>
          <h2>More about us!</h2>
          <span>
            Welcome to Meal Deal! Created by Tyler Gale and Ryan Walton,
            Meal Deal embodies what it means to treat yourself; that is,
            eat what you want! Meal Deal offers a high-tech solution to one of the
            hardest problems of the 21st century: meal planning. So, instead
            of enduring the painstaking process of doing it yourself, let us
            help! With our new cutting-edge software, we'll find the recipe,
            print the shopping list, and organize it all so that all you have
            to do is no more than what you want!
            <br />
            <br />
            Not a member? Sign up below!
          </span>
          <div className={styles.buttonContainer}>
            <button className={styles.signinButton} onClick={sign_up}>
              Sign up
            </button>
            <button className={styles.signinButton} onClick={sign_in}>
              Sign in
            </button>
          </div>
          <p>Officially copyrighted with the National Copyright Association</p>
        </div>
      </div>
    </div>
  );
}
