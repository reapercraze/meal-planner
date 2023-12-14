import { Link } from 'react-router-dom';
import React from "react";
import '../styles/About.css';

export function About() {
    return (
        <div className="about">
            <span>Flavor Town</span>
            <div className="master-container">
                <div className="text-container">
                    <h1 className="header">More about us!</h1>
                    <div className="description">
                        Suck my nuts
                    </div>
                    <button className="signin-button">Sign In</button>
                    <p className="signup-link">Not a member? <Link to="/sign_up">Sign up now!</Link></p>
                </div>
            </div>
        </div>
    )
}