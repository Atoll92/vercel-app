// gameService.js
import { ref, set, onValue } from 'firebase/database';
import { getDatabase } from 'firebase/database';

// Initialize Firebase Realtime Database
const db = getDatabase();

// Define a reference to the game state
const gameStateRef = ref(db, 'gameState');

// Function to set the initial game state
export const initializeGameState = (initialState) => {
  set(gameStateRef, initialState);
};

// Function to update the game state
export const updateGameState = (newState) => {
  set(gameStateRef, newState);
};

// Function to listen for changes in the game state
export const subscribeToGameState = (callback) => {
  onValue(gameStateRef, (snapshot) => {
    const gameState = snapshot.val();
    callback(gameState);
  });
};
