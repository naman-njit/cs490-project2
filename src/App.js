import { useState, useEffect } from "react";

import Board from './components/Board';
import Leaderboard from './components/Leaderboard';

function App() {
  const [test, setTest] = useState('loading...');

  useEffect(() => {
    fetch('/api/test/hello').then((res) => {
      res.json().then((data) => {
        setTest(data.test);
      })
    })
  }, []);

  return (
    <div className="App">
      <Board />
      <Leaderboard />
    </div>
  );
}

export default App;
