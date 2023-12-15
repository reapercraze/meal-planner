import styles from './App.module.css';

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


  return (
    <>
    <div>
      This is where the random recipe will appear?
    </div>
    </>
  );
}

export default App;
