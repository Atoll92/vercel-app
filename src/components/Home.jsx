import React, { useEffect } from 'react';
import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat';
import { Link } from 'react-router-dom';
import UploadPic from './UploadPic';
import { getDownloadURL } from 'firebase/storage';
import { getStorage } from 'firebase/storage';
// import { ref } from 'firebase/storage';
import  {  ref as reef } from 'firebase/storage';
import { getDatabase, onValue, ref, remove, set } from "firebase/database";
import Header from './Header';
// import pirate from '@/Assets/images/pirate.svg'
import { useState } from 'react';
import GameSession from './GameSession';


function objectToArray(obj) {
  return obj ? Object.keys(obj).map((key) => {
    return {
      uid: key,
      ...obj[key]
    }
  }) : []
}

const Home = () => {

  



  const [user, setUser] = React.useState(); // Local signed-in state.
  const [isInQueue, setIsInQueue] = React.useState(false); // Local signed-in state.
  const [queue, setQueue] = React.useState(); // Local signed-in state.
  const db = getDatabase();
  const storage = getStorage();
  const [invitationLink, setInvitationLink] = useState(null);
  const [invitationLinkClicked, setInvitationLinkClicked] = useState(false);
  const [gameId, setGameId] = useState(null);

  const handleInvitationLinkClick = () => {
    if (user) {
      const gameId = Math.random().toString(36).substring(7);
      const link = `${window.location.origin}/join?gameId=${gameId}`;
      setInvitationLink(link);
      setGameId(gameId);
      setInvitationLinkClicked(true);
    }
  };

  // Listen to the Firebase Auth state and set the local user state.
  React.useEffect(() => {
    const unregisterAuthObserver = getAuth().onAuthStateChanged(user => {
      setUser(user)
    });

    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  //when user changes
  React.useEffect(() => {
    if (user) {
      const currentQueue = ref(db, 'queue');
      const currentGames = ref(db, 'games');
      onValue(currentQueue, (snapshot) => {
        const data = snapshot.val();
        setQueue(data);
      });
      onValue(currentGames, (snapshot) => {
        console.log("games changed", snapshot.val())
        const data = snapshot.val();
        const games = objectToArray(data)
        if(games.find((game) => game.p1 === user?.uid || game.p2 === user?.uid)) {
          window.location.href = "/game"
        }
      });
    }
  }, [user]);

  const findGame = async () => {
    setIsInQueue(true)
    if(!queue) {
      joinQueue()
    }
    const queueSlots = objectToArray(queue)

    if(queueSlots.find((slot) => slot.uid !== user?.uid)) {

      const oppentId = queueSlots.find((slot) => slot.uid !== user?.uid)?.uid

      //remove opponent from queue
      await remove(ref(db, 'queue/' + oppentId));
      //remove self from queue
      await remove(ref(db, 'queue/' + user?.uid));

      const gameId = user?.uid + oppentId
      //create game
      set(ref(db, 'games/' + gameId), {
        p1: user?.uid,
        p2: oppentId,
        beginDate: Date.now()
      });

    } else {
      joinQueue()
    }
  }


  const joinQueue = () => {
      console.log("join queue with userid " + user?.uid)
      set(ref(db, 'queue/' + user?.uid), {
        inQueue: true,
        joinQueueDate: Date.now()
      });
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
        <Header/>
      <section className="flex flex-col items-center justify-center gap-7 text-center text-blue-100">
        <img style={{maxWidth:"20%"}} id="userpic"></img>
      <div className='login_pannel'>
          My email is {user?.email}<br/>
          My displayname is {user?.displayName}<br/>
          My uid is {user?.uid}<br/>
          <UploadPic/>
      </div>
      <button className='border p-2 hover:bg-blue-600' onClick={() => findGame()}>Find Game</button><br/><br/>
      {isInQueue && <div className='p-2 animate-ping'>Looking for opponent</div>}
      {queue && JSON.stringify(queue)}
   
         {/* Render the invitation link if it exists */}
         {invitationLink && (
          <div>
            Invitation Link:
            <a href={invitationLink} target="_blank" rel="noopener noreferrer">
              {invitationLink}
            </a>
          </div>
        )}
         {!invitationLinkClicked && (
        <button onClick={handleInvitationLinkClick}>Click to join the game</button>
      )}
      {/* {invitationLinkClicked && gameId && (
        <GameSession gameId={gameId} />
      )} */}

        {/* Render a button to generate the invitation link */}
      </section>
      </main>
  );
};

export default Home;
