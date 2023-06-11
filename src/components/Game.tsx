import React from 'react';
import { User, getAuth } from "firebase/auth";

const Game = () => {

  const [user, setUser] = React.useState<User | null>(); // Local signed-in state.
  const [game, setGame] = React.useState<any>(); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local user state.
  React.useEffect(() => {
    const unregisterAuthObserver = getAuth().onAuthStateChanged(user => {
      setUser(user)
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  function getCurrentGame(user: User) {
    return {p1: "user1", p2: "user2", gameState: {}}
  }

  // Get current game
  React.useEffect(() => {
    if (user) {
      const currentGame = getCurrentGame(user)
      console.log(currentGame)
      setGame(currentGame)
    }
  }
  , [user]);

  return (
      <main className="grid min-h-screen place-content-center bg-gradient-to-b from-blue-700 to-blue-800">
      <section className="flex flex-col items-center justify-center gap-7 text-center text-blue-100">
        {game ? <div>
          <div>Player 1: {game.p1}</div>
          <div>Player 2: {game.p2}</div>
          <div>Game state: {JSON.stringify(game.gameState)}</div>
        </div> : <div className='p-2 animate-ping'>Waiting for game</div>}
      </section>
      </main>
  );
};

export default Game;
