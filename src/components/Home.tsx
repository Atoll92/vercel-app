import React from 'react';
import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

if (user) {
    console.log(user.email)
  // User is signed in, see docs for a list of available properties
  // https://firebase.google.com/docs/reference/js/auth.user
  // ...
} else {
console.log("nouser")
}

const Home = () => {
    return (
        <main className="grid min-h-screen place-content-center bg-gradient-to-b from-blue-700 to-blue-800">
        <section className="flex flex-col items-center justify-center gap-7 text-center text-blue-100">
        <div>
            My Harbour is {user?.email}
        </div>
        </section>
        </main>
    );
};

export default Home;