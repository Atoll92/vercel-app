import { getDatabase, ref, onValue } from 'firebase/database';

const db = getDatabase();



export const listenToGridState = (gameId, callback) => {
  // Create a reference to the 'gridState' location in the database
  const gridStateRef = ref(db, `games/${gameId}/GridState}`);
  console.log("GAMEID:" + gameId)

  // Listen for changes to the 'gridState' data
  onValue(gridStateRef, (snapshot) => {
    const gridState = snapshot.val();
    // Invoke the callback function with the updated gridState
    callback(gridState);
  });

  
};
