

import { listenToGridState } from './gameService';
import { useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

import React, { useState, useEffect } from 'react';

   

import { onValue , ref, set } from 'firebase/database';
import { db } from './firebase';

const GRID_SIZE = 8;
const PHASES = {
  SPAWN: 'spawn',
  MOVE: 'move',
  SHOOT: 'shoot',
};

const initialGrid = Array.from({ length: GRID_SIZE }, () =>
  Array.from({ length: GRID_SIZE }, () => null)
);

const GridGame = () => {
  const [grid, setGrid] = useState(initialGrid);
//   const [gridState, setGridState] = useState({});
  const [currentPlayer, setCurrentPlayer] = useState('Player 1');
  const [winner, setWinner] = useState(null);
  const [currentPhase, setCurrentPhase] = useState(PHASES.SPAWN);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const gameId = searchParams.get('gameId');
  const [gridState, setGridState] = useState([]);

  useEffect(() => {
    // Reference to the 'gridState' in your Firebase Realtime Database
    const gridStateRef = ref(db, `games/${gameId}/gridState`);

    // Set up a listener to listen for changes to 'gridState'
    onValue(gridStateRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Update the 'gridState' state in your component
        setGridState(data);
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      // Unsubscribe from the listener
    };
  }, [gameId]);


  const updateGridStateInFirebase = (newGrid) => {
    const gridStateRef = ref(db, `games/${gameId}/gridState`);
    set(gridStateRef, newGrid); // Set the updated grid data to the Firebase Realtime Database
  };

 





  const handleClick = (row, col) => {
    if (!grid[row][col] && !winner) {
      if (currentPhase === PHASES.SPAWN) {
        // Allow spawning only in this phase
        const newGrid = [...grid];
        newGrid[row][col] = currentPlayer;
        setGrid(newGrid);
        setCurrentPhase(PHASES.MOVE);
        togglePlayer();
        setGridState(newGrid);

        updateGridStateInFirebase(newGrid);
      } else if (currentPhase === PHASES.MOVE) {
        // Handle move logic here (e.g., move to the selected cell)
        // After the move, change to the SHOOT phase
        // Update the grid, check for a winner, and toggle the player
        // You'll need additional logic for moving between cells.
        // Example:
        const newGrid = [...grid]; // Initialize newGrid
        // Move logic here
        newGrid[row][col] = currentPlayer;
        setGrid(newGrid); // Update the grid
        // checkWinner(row, col);
        setCurrentPhase(PHASES.SHOOT);
        setGridState(newGrid);

        updateGridStateInFirebase(newGrid);
        // updateGridStateInFirestore(gameId, newGrid);
      } else if (currentPhase === PHASES.SHOOT) {
        // Handle shoot logic here (e.g., shoot at the selected cell)
        // After the shoot, change back to the SPAWN phase
        // Update the grid, check for a winner, and toggle the player
        // You'll need additional logic for shooting at cells.
        // Example:
        const newGrid = [...grid]; // Initialize newGrid
        // Shoot logic here

        togglePlayer('Player 2');
        newGrid[row][col] = 'Shot'; // Example: Mark the cell as 'Shot'
        setGrid(newGrid); // Update the grid
        setCurrentPhase(PHASES.MOVE);
        setGridState(newGrid);

        updateGridStateInFirebase(newGrid);
        // updateGridStateInFirestore(gameId, newGrid);
      }
      console.log('Current Phase:', currentPhase);
    }
  };

  const togglePlayer = () => {
    setCurrentPlayer(currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1');
  };

  const checkWinner = (row, col) => {
    // Check for a win condition (e.g., horizontal, vertical, or diagonal)
    // ... Your existing checkWinner logic ...
  };

  const renderCell = (row, col) => {
    // Get the cell value from gridState
    const cellValue = gridState[row] && gridState[row][col];
  
    // Determine the cell class based on the cell value
    let cellClass = '';
  
    if (cellValue === 'Player 1') {
      // Add a specific class for cells with "Player 1"
      cellClass = 'player-1';
    } else if (cellValue === 'Player 2') {
      // Add a specific class for cells with "Player 2"
      cellClass = 'player-2';
    } else if (cellValue === 'Shot') {
      // Add a specific class for cells with "Shot"
      cellClass = 'shot';
    }
    return (
        <div
          key={`${row}-${col}`}
          className={`cell ${cellClass} ${grid[row][col] ? 'filled' : ''}`}
          onClick={() => handleClick(row, col)}
        >
          {grid[row][col]}
        </div>
      );
    }

    

//   const renderCell = (row, col) => (
//     <div
//       key={`${row}-${col}`}
//       className={`cell ${grid[row][col] ? 'filled' : ''} ${
//         grid[row][col] === 'Player 1' ? 'player-1' : grid[row][col] === 'Player 2' ? 'player-2' : ''
//       }`}
//       onClick={() => handleClick(row, col)}
//     >
//       {grid[row][col]}
//     </div>
//   );

  useEffect(() => {
    // Check for changes in the game state (e.g., currentPlayer, currentPhase)
    // You can use this effect to trigger AI moves or perform other actions.
  }, [currentPlayer, currentPhase]);

  return (
    <div>
      <h1>Grid Game</h1>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((_, colIndex) => renderCell(rowIndex, colIndex))}
          </div>
        ))}
      </div>
      {winner && (
        <p className="winner">
          {winner === 'Draw' ? 'It\'s a draw!' : `${winner} wins!`}
        </p>
      )}
      <p className="current-player">Current Player: {currentPlayer}</p>
      <p className="current-phase">Current Phase: {currentPhase}</p>
      <pre>{JSON.stringify(gridState, null, 2)}</pre>
    </div>
  );
};

export default GridGame;

