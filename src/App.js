import { useState, useEffect } from "react";

import Board from './components/Board';
import Leaderboard from './components/Leaderboard';

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
      {username ? <Board /> : <div>loading...</div>}
      <Leaderboard />
    </div>
  );
}

export default App;
