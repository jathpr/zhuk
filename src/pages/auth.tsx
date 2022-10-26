import React, { useEffect, useState } from "react"
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword , onAuthStateChanged, signOut} from "firebase/auth";
import { app } from "../firebase";

const AuthPage = () => {
    const auth = getAuth(app);

    const [login, setLogin] = useState("")
    const [pass, setPass] = useState("")
    const [user, setUser] = useState<string>()

    const handleSubmit = (e) => {
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

       const handleReg = () => createUserWithEmailAndPassword(auth, login, pass)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

  useEffect(() =>{
    const unlisten =  onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          setUser(uid)
        } else {
            setUser(undefined)
          // User is signed out
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
     <form onSubmit={handleSubmit}>
        <label>
            Name yourself:
            <input type="text" value={login} onChange={(e) =>{ 
                setLogin(e.target.value)}} />
        </label>
        <label>
            Tell me you secret:
            <input type="text" value={pass} onChange={(e) => setPass(e.target.value)} />
        </label>
        <input type="submit" value="Do it!" />
    </form>
    {/* <button onClick={handleReg}>Regmi</button> */}
    {user && "hello, user " + user}
    <button onClick={handleSignOut}>SignOut</button>
    </>
    
   
}

export default AuthPage