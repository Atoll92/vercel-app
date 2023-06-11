import React, { useEffect } from 'react';
import { User, getAuth } from "firebase/auth";
import firebase from 'firebase/compat';
import { Link } from 'react-router-dom';
import { getDatabase, onValue, ref, set } from "firebase/database";
import UploadPic from './UploadPic';
import { getDownloadURL } from 'firebase/storage';
import { getStorage } from 'firebase/storage';
// import { ref } from 'firebase/storage';
import  {  ref as reef } from 'firebase/storage';

const Home = () => {

  const [user, setUser] = React.useState<User | null>(); // Local signed-in state.
  const [isInQueue, setIsInQueue] = React.useState<boolean>(false); // Local signed-in state.
  const [queue, setQueue] = React.useState<any>(); // Local signed-in state.
  const db = getDatabase();
  const storage = getStorage();

  // Listen to the Firebase Auth state and set the local user state.
  React.useEffect(() => {
    const unregisterAuthObserver = getAuth().onAuthStateChanged(user => {
      setUser(user)
    });
    const currentQueue = ref(db, 'queue');
    onValue(currentQueue, (snapshot) => {
      const data = snapshot.val();
      setQueue(data);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const joinQueue = () => {
      console.log("join queue with userid " + user?.uid)
      set(ref(db, 'queue/' + user?.uid), {
        inQueue: true,
        joinQueueDate: Date.now()
      });
      setIsInQueue(true)
  }

  // // check queue to find opponent
  // React.useEffect(() => {
  //   if (isInQueue) {

  //   }
  // }, [isInQueue,]);
  useEffect( () => {
    // refreshImage()
    if(user) {

   
      getDownloadURL(reef(storage, `images/${user.uid}`))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
    
      
        // Or inserted into an <img> element
        const img = document.getElementById('userpic');
        img.setAttribute('src', url);
      })
      .catch((error) => {
        console.log(error)
      });
    }
    
     
    },[user])



  return (
      <main className="grid min-h-screen place-content-center bg-gradient-to-b from-blue-700 to-blue-800">
      <section className="flex flex-col items-center justify-center gap-7 text-center text-blue-100">
        <img style={{maxWidth:"20%"}} id="userpic"></img>
      <div>
          My email is {user?.email}<br/>
          My displayname is {user?.displayName}<br/>
          My uid is {user?.uid}<br/>
          <UploadPic/>
      </div>
      <Link to="/"><button><a onClick={() => firebase.auth().signOut()}>Sign-out</a></button> </Link>
      <button className='border p-2 hover:bg-blue-600' onClick={() => joinQueue()}>Join Queue</button><br/><br/>
      {isInQueue && <div className='p-2 animate-ping'>You are in the queue</div>}
      {queue && JSON.stringify(queue)}
      </section>
      </main>
  );
};

export default Home;
