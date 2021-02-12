import { useState, useEffect } from "react";

import Board from './components/Board';
import Leaderboard from './components/Leaderboard';
import GoogleButton from './components/GoogleButton';

function App() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    fetch('/api/login/hello').then((res) => {
      res.json().then((data) => {
        setUsername(data.username);
      })
    })
  }, []);

  return (
    <div className="App">
      <GoogleButton />
      {username ? <Board /> : <div>loading...</div>}
      <Leaderboard />
    </div>
  );
}

export default App;
