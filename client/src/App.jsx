import { Link } from 'react-router-dom';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {

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

  async function sign_in() {
    const res = await fetch("/registration/sign_in/", {
      credentials: "same-origin", // include cookies!
    });
    if (res.ok) {
      window.location = "/registration/sign_in/"
    } else {
      console.error('Failed to fetch data');
    }
  }

  async function sign_up() {
    const res = await fetch("/registration/sign_up/", {
      credentials: "same-origin", // include cookies!
    });
    if (res.ok) {
      window.location = "/registration/sign_up"
    } else {
      console.error('Failed to fetch data');
    }
  }


  return (
    <>
    <div>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/create_plan">Create Plan</Link>
        <Link to="/view_plans">View Plans</Link>
        <button onClick={sign_in}>Sign In</button>
        <button onClick={sign_up}>Sign Up</button>
        <button onClick={logout}>Logout</button>
      </nav>
      <Outlet />
    </div>
    </>
  );
}

export default App;
