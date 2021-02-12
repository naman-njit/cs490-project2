import { useState, useEffect } from 'react';

import Board from './components/Board';
import Leaderboard from './components/Leaderboard';
import Login from './components/Login';

function App() {
  const [username, setUsername] = useState(null);

  return (
    <div className="App">
      {username ? (
        <Board username={username} />
      ) : (
        <div>
          <div>Please log in to continue</div>
          <Login setUsername={setUsername} />
        </div>
      )}
      <Leaderboard />
    </div>
  );
}

export default App;
