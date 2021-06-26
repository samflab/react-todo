import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Todos from "./Todo";
import firebase from "firebase";

const signInWithGoogle = () =>
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
const SignIn = () => (
  <main className ="todo">
    <h2>TODO</h2>
    <p className="main">
      <button className="signInButton" onClick={signInWithGoogle}> Sign in with Google</button>
    </p>
  </main>
);

const App = () => {
  const [user] = useAuthState(auth);
  return (
    
      user ? <Todos /> : <SignIn />
    
  );
};

export default App;
