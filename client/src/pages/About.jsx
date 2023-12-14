import { Link } from 'react-router-dom';
import React from "react";
import '../styles/About.css';

export function About() {
    return (
        <div className="container">
            <div className="signin-container">
                <h1 className="signin-header">Sign-In</h1>
                <div className="input-container">
                    <input type="text" placeholder="Username or Email" className="input-field" />
                </div>
                <div className="input-container">
                    <input type="password" placeholder="Password" className="input-field" />
                </div>
                <button className="signin-button">Sign In</button>
                <p className="signup-link">Not a member? <Link to="/sign_up">Sign up now!</Link></p>
            </div>
        </div>
    )
}