import { useContext } from "react";
import UserContext from '../Contexts/UserContext'
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_CONFIG } from '@env';
const firebaseConfig = JSON.parse(FIREBASE_CONFIG);




export default function Auth() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  return auth;
  
}
 

function getUser() {
    const { setEmail } = useContext(UserContext);
    onAuthStateChanged(auth, (user) => {
      if (user) { 
      const uid = user.uid;
      console.log(user)
      return user;
    } else {
      console.log('none')
    }
  });
  }
  
  function signIn(email, password) {
    console.log(email)
    const { setEmail } = useContext(UserContext);
    signInWithEmailAndPassword(auth, email, password)
          .then(async (userCredentials) => {
            const user = userCredentials.user;
            setEmail(user.email);
          })
          .catch((err) => {
            console.log(err);
          });
  }
  
  function signUp(email,password) {
    createUserWithEmailAndPassword(auth, email, password)
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
  }