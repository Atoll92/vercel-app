import react from '@/Assets/images/react.svg'
import tailwindcss from '@/Assets/images/tailwindcss.svg'
import typescript from '@/Assets/images/typescript.svg'
import vercel from '@/Assets/images/vercel.svg'
import vite from '@/Assets/images/vite.svg'
import pirate from '@/Assets/images/pirate.svg'
// import firebase from 'firebase/compat'
import { useEffect } from 'react'
import Signup from './SignUp'
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import * as firebaseui from 'firebaseui'
// import 'firebaseui/dist/firebaseui.css'
// import {uiConfig } from "./firebase"

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import Home from './Home'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Login from './Login'
// import { firebaseConfig } from './firebase'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import Header from './Header'
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';



// import firebase from 'firebase/compat/app';
// import * as firebaseui from 'firebaseui'
// import 'firebaseui/dist/firebaseui.css'


// const auth = getAuth(app);

function App() {

  // const app = initializeApp(firebaseConfig);

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
          console.log("uid", uid)
        } else {
          // User is signed out
          // ...
          console.log("user is logged out")
        }
      });
     
}, [])





  return (
    <>
    <Header/>
    <main className="grid min-h-screen place-content-center bg-gradient-to-b from-blue-700 to-blue-800">
      <section className="flex flex-col items-center justify-center gap-7 text-center text-blue-100">
        <h1 className="text-7xl font-bold tracking-wide">
          Naval Beef
          <span className="block text-3xl italic">A very wet game</span>
        </h1>
        <p className="max-w-sm text-base leading-7 sm:max-w-none">
         Fight or sink !
        </p>
        
        <a
          className="rounded bg-blue-100 py-3 px-4 font-bold uppercase tracking-wide text-blue-700 shadow-md shadow-blue-800 transition-colors hover:bg-blue-900 hover:text-blue-100"
          href="https://github.com/Drumpy/vrttv-boilerplate"
          rel="noopener noreferrer"
          target="_blank"
        >
          Set sails →
        </a>
        <div>
    
      {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> */}
    </div>

        <div>
         <Login/>
     </div>
   
        <div className="flex gap-8 pt-4">
    
          <img
            alt="Pirate Icon"
            className="fill-white hover:text-blue-100"
            height="320px"
            src={pirate}
            width="320px"
          />
         
        </div>
      </section>
    </main>
    </>
  )
}

export default App
