import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCA3D8NjnwguFwuEqdM3CzEVA85sBuerrc",
    authDomain: "dramatic-wire-gwi22.firebaseapp.com",
    projectId: "dramatic-wire-gwi22",
    storageBucket: "dramatic-wire-gwi22.appspot.com",
    messagingSenderId: "510768235679",
    appId: "1:510768235679:web:4fd9471101a7303d57ceaa",
    measurementId: "G-60J32ZDVE6"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const auth = firebase.auth();


export { auth };



// // Import the functions you need from the SDKs you need
// import * as firebase from "firebase";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyCA3D8NjnwguFwuEqdM3CzEVA85sBuerrc",
//     authDomain: "dramatic-wire-gwi22.firebaseapp.com",
//     projectId: "dramatic-wire-gwi22",
//     storageBucket: "dramatic-wire-gwi22.appspot.com",
//     messagingSenderId: "510768235679",
//     appId: "1:510768235679:web:4fd9471101a7303d57ceaa",
//     measurementId: "G-60J32ZDVE6"
// };

// // Initialize Firebase
// let app;
// if (firebase.apps.length === 0) {
//     app = firebase.initializeApp(firebaseConfig);
// } else {
//     app = firebase.app()
// }

// const auth = firebase.auth()

// export { auth };