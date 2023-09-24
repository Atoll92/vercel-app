import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import GridGame from './GridGame';
import { getFirestore, doc, setDoc , FieldValue } from 'firebase/firestore';
import { useEffect } from 'react';
import { getDoc } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/database';

const db = getFirestore();

const GameSession = () => {

  const [gameState, setGameState] = useState(/* initial game state */);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const gameId = searchParams.get('gameId');



  const createGame = async () => {
    try {
      // Check if the game document already exists
      const gameDocRef = doc(db, 'games', gameId);
      const gameDocSnapshot = await getDoc(gameDocRef);
      if (!gameDocSnapshot.exists()) {
        // The game document doesn't exist, so create it
        const initialGameData = {
          // Add your initial game data fields here
          timestamp: serverTimestamp()
        };
        await setDoc(gameDocRef, initialGameData);
        console.log('intitialstate stored')
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

      <GridGame gameId={gameId}/>
     
    </div>
  );
};

export default GameSession;
