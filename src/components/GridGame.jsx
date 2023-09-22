import React, { useState } from 'react';

const GRID_SIZE = 8;

const initialGrid = Array.from({ length: GRID_SIZE }, () =>
  Array.from({ length: GRID_SIZE }, () => null)
);

const GridGame = () => {
  const [grid, setGrid] = useState(initialGrid);
  const [currentPlayer, setCurrentPlayer] = useState('Player 1');
  const [winner, setWinner] = useState(null);

  const handleClick = (row, col) => {
    if (!grid[row][col] && !winner) {
      const newGrid = [...grid];
      newGrid[row][col] = currentPlayer;
      setGrid(newGrid);
      checkWinner(row, col);
      togglePlayer();
    }
  };

  const togglePlayer = () => {
    setCurrentPlayer(currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1');
  };

  const checkWinner = (row, col) => {
    // Check for a win condition (e.g., horizontal, vertical, or diagonal)

    // Horizontal
    for (let i = 0; i < GRID_SIZE; i++) {
      if (
        grid[row][i] !== currentPlayer ||
        (i !== col && grid[row][i] !== currentPlayer)
      ) {
        break;
      }
      if (i === GRID_SIZE - 1) {
        setWinner(currentPlayer);
        return;
      }
    }

    // Vertical
    for (let i = 0; i < GRID_SIZE; i++) {
      if (
        grid[i][col] !== currentPlayer ||
        (i !== row && grid[i][col] !== currentPlayer)
      ) {
        break;
      }
      if (i === GRID_SIZE - 1) {
        setWinner(currentPlayer);
        return;
      }
    }

    // Diagonal (top-left to bottom-right)
    if (row === col) {
      for (let i = 0; i < GRID_SIZE; i++) {
        if (
          grid[i][i] !== currentPlayer ||
          (i !== row && grid[i][i] !== currentPlayer)
        ) {
          break;
        }
        if (i === GRID_SIZE - 1) {
          setWinner(currentPlayer);
          return;
        }
      }
    }

    // Diagonal (top-right to bottom-left)
    if (row + col === GRID_SIZE - 1) {
      for (let i = 0; i < GRID_SIZE; i++) {
        if (
          grid[i][GRID_SIZE - 1 - i] !== currentPlayer ||
          (i !== row && grid[i][GRID_SIZE - 1 - i] !== currentPlayer)
        ) {
          break;
        }
        if (i === GRID_SIZE - 1) {
          setWinner(currentPlayer);
          return;
        }
      }
    }

    // Check for a draw (no winner)
    if (!grid.flat().includes(null)) {
      setWinner('Draw');
    }
  };

  const renderCell = (row, col) => (
    <div
      key={`${row}-${col}`}
      className={`cell ${grid[row][col] ? 'filled' : ''}`}
      onClick={() => handleClick(row, col)}
    >
      {grid[row][col]}
    </div>
  );

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
      {winner && <p className="winner">{winner === 'Draw' ? 'It\'s a draw!' : `${winner} wins!`}</p>}
      <p className="current-player">Current Player: {currentPlayer}</p>
    </div>
  );
};

export default GridGame;
