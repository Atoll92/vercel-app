import React, { useEffect } from 'react';
import { getAuth } from "firebase/auth";




const Home = () => {

    const auth = getAuth();
const user = auth.currentUser;

const [isSignedIn, setIsSignedIn] = React.useState(false); // Local signed-in state.

// Listen to the Firebase Auth state and set the local state.
React.useEffect(() => {
  const unregisterAuthObserver = getAuth().onAuthStateChanged(user => {
    setIsSignedIn(!!user);
  });
  return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
}, []);
  

//     React.useEffect(() => { 
// if (user) {
//     console.log(user.email)
   
//     console.log("user signed in ")
//   // User is signed in, see docs for a list of available properties
//   // https://firebase.google.com/docs/reference/js/auth.user
//   // ...
// } else {
// console.log("nouser")
// }
// });




    return (
        <main className="grid min-h-screen place-content-center bg-gradient-to-b from-blue-700 to-blue-800">
        <section className="flex flex-col items-center justify-center gap-7 text-center text-blue-100">
        <div>
            My email is {user?.email}<br/>
            My displayname is {user?.displayName}
        </div>
        </section>
        </main>
    );
};

export default Home;