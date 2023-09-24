// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
// import GridGame from './GridGame';

// import { useEffect } from 'react';
// import { getDoc } from 'firebase/firestore';
// import { serverTimestamp } from 'firebase/database';
// import firebase from 'firebase/compat';
// import { getDatabase, ref, onValue } from 'firebase/database';

// const db = firebase.database();

// const GameSession = () => {

 

 
//     const [currentServerTimestamp, setCurrentServerTimestamp] = useState(null);
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const gameId = searchParams.get('gameId');
  
//     const createGame = async () => {
//       try {
//         // Check if the game document already exists
//         const gameRef = db.ref(`games/${gameId}`);
//         const gameSnapshot = await gameRef.once('value');
        
//         if (!gameSnapshot.exists()) {
//           // The game data doesn't exist, so create it
//           const initialGameData = {
//             // Add your initial game data fields here
//             timestamp: firebase.database.ServerValue.TIMESTAMP,
//           };
          
//           await gameRef.set(initialGameData);
  
//           // Retrieve the current server timestamp and store it in the state
//           gameRef.child('timestamp').once('value', (snapshot) => {
//             const currentTimestamp = snapshot.val();
//             setCurrentServerTimestamp(new Date(currentTimestamp).toString());
//           });
  
//           console.log('Initial state stored');
//         }
//       } catch (error) {
//         console.error('Error creating game:', error);
//         throw error;
//       }
//     };
  
//     useEffect(() => {
//       // Call createGame when the component loads
//       createGame();
//     }, [gameId]);


//   // Add game logic and functionality here

//   return (
//     <div>
//       <h2>Game Session</h2>
      
//       <p>Game ID: {gameId}</p>

//       <GridGame gameId={gameId}/>
     
//     </div>
//   );
// };

// export default GameSession;
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GridGame from './GridGame';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAzKpACgjJGkhK0AEXtqBAviFTl-Z-OfQk",
  authDomain: "navalbeef.firebaseapp.com",
  projectId: "navalbeef",
  storageBucket: "navalbeef.appspot.com",
  messagingSenderId: "585797045998",
  appId: "1:585797045998:web:45b3039073c40c9a7aadff",
  measurementId: "G-KMG0CLFCH5",
  databaseURL:"https://navalbeef-default-rtdb.europe-west1.firebasedatabase.app/"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

const GameSession = () => {
  const [currentServerTimestamp, setCurrentServerTimestamp] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const gameId = searchParams.get('gameId');

  const createGame = async () => {
    try {
      // Check if the game data already exists
      const gameRef = ref(db, `games/${gameId}`);
      const gameSnapshot = await get(gameRef);

      if (!gameSnapshot.exists()) {
        // The game data doesn't exist, so create it
        const initialGridState = [
          // Define your grid rows here
        
          ['-', '-', '-','-', '-', '-','-', '-'],
          ['-', '-', '-','-', '-', '-','-', '-'],
          ['-', '-', '-','-', '-', '-','-', '-'],
          ['-', '-', '-','-', '-', '-','-', '-'],
          ['-', '-', '-','-', '-', '-','-', '-'],
          ['-', '-', '-','-', '-', '-','-', '-'],
          ['-', '-', '-','-', '-', '-','-', '-'],
          ['-', '-', '-','-', '-', '-','-', '-'],
        ];

        const initialGameData = {
          // Add your initial game data fields here
          timestamp: new Date().toISOString(),
          gridState: initialGridState,
        };

        await set(gameRef, initialGameData);

        // Retrieve the current server timestamp and store it in the state
        const currentTimestampSnapshot = await get(ref(gameRef, 'timestamp'));
        const currentTimestamp = currentTimestampSnapshot.val();
        setCurrentServerTimestamp(currentTimestamp);

        console.log('Initial state stored');
      }
    } catch (error) {
      console.error('Error creating game:', error);
      throw error;
    }
  };

  useEffect(() => {
    // Call createGame when the component loads
    createGame();
  }, [gameId]);

  // Add game logic and functionality here

  return (
    <div>
      <h2>Game Session</h2>
      <p>Game ID: {gameId}</p>
      {/* <p>Current Server Timestamp: {currentServerTimestamp || 'Loading...'}</p> */}
      <GridGame gameId={gameId} />
    </div>
  );
};

export default GameSession;
