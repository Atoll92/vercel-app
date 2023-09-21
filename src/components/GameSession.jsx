import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const GameSession = () => {

  const [gameState, setGameState] = useState(/* initial game state */);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const gameId = searchParams.get('gameId');


  // Add game logic and functionality here

  return (
    <div>
      <h2>Game Session</h2>
      
      <p>Game ID: {gameId}</p>
     
    </div>
  );
};

export default GameSession;
