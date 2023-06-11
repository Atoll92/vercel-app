import React from 'react';
import { User, getAuth } from "firebase/auth";
import { getDatabase, onValue, ref, update } from 'firebase/database';

function objectToArray(obj: any) {
  return obj ? Object.keys(obj).map((key) => {
    return {
      uid: key,
      ...obj[key]
    }
  }) : []
}

const Game = () => {

  const [user, setUser] = React.useState<User | null>();
  const [game, setGame] = React.useState<any>()
  const [playerNumber, setPlayerNumber] = React.useState<number>(0);
  const [otherPlayerNumber, setOtherPlayerNumber] = React.useState<number>(0);
  const db = getDatabase();

  // Listen to the Firebase Auth state and set the local user state.
  React.useEffect(() => {
    const unregisterAuthObserver = getAuth().onAuthStateChanged(user => {
      setUser(user)
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  // Get current game
  React.useEffect(() => {
    if (user) {
      const currentGames = ref(db, 'games');
      onValue(currentGames, (snapshot) => {
        console.log("games changed", snapshot.val())
        const data = snapshot.val();
        const games = objectToArray(data)
        if(games.find((game) => game.p1 === user?.uid || game.p2 === user?.uid)) {
          setGame(games.find((game) => game.p1 === user?.uid || game.p2 === user?.uid))
          setPlayerNumber(games.find((game) => game.p1 === user?.uid || game.p2 === user?.uid)?.p1 === user?.uid ? 1 : 2)
          setOtherPlayerNumber(games.find((game) => game.p1 === user?.uid || game.p2 === user?.uid)?.p1 === user?.uid ? 2 : 1)
        }
      });
    }
  }, [user]);

  function placeBoat(coords: any){
    update(ref(db, 'games/' + game?.uid), {
      ["position-p"+playerNumber]: coords,
    });
  }

  function attack(coords: any){
    update(ref(db, 'games/' + game?.uid), {
      ["attack-p"+playerNumber]: coords,
    });
  }

  return (
      <main className="grid min-h-screen place-content-center bg-gradient-to-b from-blue-700 to-blue-800">
      <section className="flex flex-col items-center justify-center gap-7 text-center text-blue-100">
        {game ? <div>
          <div>Player 1: {game.p1}</div>
          <div>Player 2: {game.p2}</div>
          <div>Begin date: {game.beginDate}</div>
          <pre className='text-left'>Game: {JSON.stringify(game, null, 2)}</pre>
        </div> : <div className='p-2 animate-ping'>Waiting for game</div>}

        {game && !game["position-p"+playerNumber] && <>
          <button className="px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded hover:bg-blue-700" onClick={() => placeBoat(1)}>Place boat on slot 1</button>
          <button className="px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded hover:bg-blue-700" onClick={() => placeBoat(2)}>Place boat on slot 2</button>
          <button className="px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded hover:bg-blue-700" onClick={() => placeBoat(3)}>Place boat on slot 3</button>
        </>}

        {game && game["position-p"+playerNumber] && !game["position-p"+otherPlayerNumber] && <>
          <div className='p-2 animate-ping'>Waiting for other player</div>
        </>}

        {game && game["position-p"+playerNumber] && game["position-p"+otherPlayerNumber] && <>
          <button className="px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded hover:bg-blue-700" onClick={() => attack(1)}>Attack slot 1</button>
          <button className="px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded hover:bg-blue-700" onClick={() => attack(2)}>Attack slot 2</button>
          <button className="px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded hover:bg-blue-700" onClick={() => attack(3)}>Attack slot 3</button>
        </>}

      </section>
      </main>
  );
};

export default Game;
