import React, { SyntheticEvent, useEffect, useState } from "react"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../firebase";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { Link } from "gatsby";

const AuthPage = () => {
  const auth = getAuth(app);

  const [login, setLogin] = useState("")
  const [pass, setPass] = useState("")
  const [user, setUser] = useState<string>()

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, login, pass)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

  }

  useEffect(() => {
    const unlisten = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUser(uid)
      } else {
        setUser(undefined)
      }
    });
    return () => {
      unlisten();
    }
  }, []);



  const handleSignOut = () => signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });


  return <>
   {user && <Header />}
    <form onSubmit={handleSubmit}>
      <label>
        Name yourself:
        <input type="text" value={login} onChange={(e) => {
          setLogin(e.target.value)
        }} />
      </label>
      <label>
        Tell me you secret:
        <input type="text" value={pass} onChange={(e) => setPass(e.target.value)} />
      </label>
      <input type="submit" value="Do it!" />
    </form>
    {user && <>"hello, dear"
      <button onClick={handleSignOut}>SignOut</button>
      <Link to="/img">Add works</Link>
    </>}
    <Footer />
  </>


}

export default AuthPage