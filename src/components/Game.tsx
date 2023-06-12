import React from 'react';
import { User, getAuth } from "firebase/auth";
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function objectToArray(obj: any) {
  return obj ? Object.keys(obj).map((key) => {
    return {
      uid: key,
      ...obj[key]
    }
  }) : []
}

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = React.useRef<any>()
  // Hold state for hovered and clicked events
  const [hovered, hover] = React.useState(false)
  const [clicked, click] = React.useState(false)

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (ref.current)
      ref.current.rotation.x += delta
  })
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function Cube(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = React.useRef<any>()
  // Hold state for hovered and clicked events
  const [hovered, hover] = React.useState(false)
  // const [clicked, click] = React.useState(false)

  let color = 'orange'
  if(props.youAttack) {
    color = 'red'
  }
  if(props.youBoat) {
    color = 'green'
  }
  // if(props.theyAttack) {
  //   color = 'blue'
  // }
  useFrame((state, delta) => {
    if(props.theyAttack) {
      if (ref.current) {
        let shakeScale = 0.2;
        let offset = [Math.random() * 0.1 - 0.05, Math.random() * 0.1 - 0.05, Math.random() * 0.1 - 0.05]
        ref.current.position.x = props.position[0] + offset[0] * shakeScale
        ref.current.position.y = props.position[1] + offset[1] * shakeScale
        ref.current.position.z = props.position[2] + offset[2] * shakeScale
      }
    }
  })



  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      // position={props.position.map((x, i) => x + offset[i])}
      ref={ref}
      scale={props.youAttack ? 1.5 : 1}
      onClick={(event) => {event.stopPropagation(); props.onClick(props.position)}}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function Line(props) {
  const ref = React.useRef<any>()
  return (
    <mesh
      {...props}
      ref={ref}
      scale={1}
    >
      <boxGeometry args={[0.01, 0.01, props.length]} />
      <meshStandardMaterial color={'grey'} />
    </mesh>
  )
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

  React.useEffect(() => {
    if(game && game["position-p"+otherPlayerNumber] && game["attack-p"+playerNumber] && game["attack-p"+otherPlayerNumber] && game["position-p"+playerNumber]) {
      if(game["position-p"+otherPlayerNumber] === game["attack-p"+playerNumber]) {
        alert("You win!")
      }
      if(game["position-p"+playerNumber] === game["attack-p"+otherPlayerNumber]) {
        alert("You lose!")
      }
    }
  }, [game])

  //3D buisness
  const lineCoords = []
  const cubeHalfSize = 1;
  for (let x = -cubeHalfSize; x <= cubeHalfSize; x++) {
    for (let y = -cubeHalfSize; y <= cubeHalfSize; y++) {
      lineCoords.push({pos:[x, y, 0],rot:[0, 0, 0]})
    }
  }
  for (let x = -cubeHalfSize; x <= cubeHalfSize; x++) {
    for (let y = -cubeHalfSize; y <= cubeHalfSize; y++) {
      lineCoords.push({pos:[x, 0, y],rot:[3.1415926 / 2.0, 0, 0]})
    }
  }
  for (let x = -cubeHalfSize; x <= cubeHalfSize; x++) {
    for (let y = -cubeHalfSize; y <= cubeHalfSize; y++) {
      lineCoords.push({pos:[0, x, y],rot:[0,  3.1415926 / 2.0,0]})
    }
  }

  const pointsCoords = []
  for (let x = -cubeHalfSize; x <= cubeHalfSize; x++) {
    for (let y = -cubeHalfSize; y <= cubeHalfSize; y++) {
      for (let z = -cubeHalfSize; z <= cubeHalfSize; z++) {
        pointsCoords.push([x, y, z])
      }
    }
  }

  const coordMatches = (coord1: any, coord2: any) => {
    return coord1[0] === coord2[0] && coord1[1] === coord2[1] && coord1[2] === coord2[2]
  }

  return (
      <main className="grid min-h-screen place-content-center bg-gradient-to-b from-blue-700 to-blue-800">
      <section className="flex flex-col items-center justify-center gap-7 text-center text-blue-100">
        <div className='w-[800px] h-[800px]'>
          {game &&
          <Canvas>
            <ambientLight />
            {lineCoords.map((coord, index) => {
              return <Line position={coord.pos} rotation={coord.rot} length={cubeHalfSize * 2} key={index} />
            })}
            {pointsCoords.map((coord, index) => {
              return <Cube
                position={coord}
                key={index}
                onClick={!game["position-p"+playerNumber] ? placeBoat : game["position-p"+otherPlayerNumber] && attack}
                youAttack={game && coordMatches(game["attack-p"+playerNumber],coord)}
                theyAttack={game && coordMatches(game["attack-p"+otherPlayerNumber],coord)}
                youBoat={game && coordMatches(game["position-p"+playerNumber],coord)}
              />
            })}
            <OrbitControls />
          </Canvas>
          }
        </div>


        {game && !game["position-p"+playerNumber] && <>
        <div className='p-2 animate-ping'>Click to place boat</div>
        </>}

        {game && game["position-p"+playerNumber] && !game["position-p"+otherPlayerNumber] && <>
          <div className='p-2 animate-ping'>Waiting for other player</div>
        </>}

        {game && game["position-p"+playerNumber] && game["position-p"+otherPlayerNumber] && <>
          <div className='p-2 animate-ping'>Click to attack</div>
        </>}

        {game ? <div>
          <div>Player 1: {game.p1}</div>
          <div>Player 2: {game.p2}</div>
          <div>Begin date: {game.beginDate}</div>
          <pre className='text-left'>Game: {JSON.stringify(game, null, 2)}</pre>
        </div> : <div className='p-2 animate-ping'>Waiting for game</div>}
      </section>
      </main>
  );
};

export default Game;
