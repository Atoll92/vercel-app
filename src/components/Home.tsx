import React from 'react';
import { User, getAuth } from "firebase/auth";

const Home = () => {

  const [user, setUser] = React.useState<User | null>(); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local user state.
  React.useEffect(() => {
    const unregisterAuthObserver = getAuth().onAuthStateChanged(user => {
      setUser(user)
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const joinQueue = () => {
      console.log("join queue")
  }

  return (
      <main className="grid min-h-screen place-content-center bg-gradient-to-b from-blue-700 to-blue-800">
      <section className="flex flex-col items-center justify-center gap-7 text-center text-blue-100">
      <div>
          My email is {user?.email}<br/>
          My displayname is {user?.displayName}
      </div>
      <button className='border p-2 hover:bg-blue-600' onClick={() => joinQueue()}>Join Queue</button>
      </section>
      </main>
  );
};

export default Home;
