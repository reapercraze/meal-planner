import { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { Outlet } from 'react-router-dom';

function App({ style }) {
  const [count, setCount] = useState(0);

  async function logout() {
    const res = await fetch("/registration/logout/", {
      credentials: "same-origin", // include cookies!
    });

    if (res.ok) {
      // navigate away from the single page app!
      window.location = "/registration/sign_in/";
    } else {
      // handle logout failed!
    }
  }

  return (
    <>
    <div>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/create_plan">Create Plan</Link>
        <Link to="/sign_up">Sign Up</Link>
        <Link to="/view_plans">View Plans</Link>
        <button onClick={logout}>Logout</button>
      </nav>
      <Outlet />
    </div>
    </>
  );
}

export default App;
