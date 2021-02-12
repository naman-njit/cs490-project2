import { useState, useEffect } from 'react';

import Board from './components/Board';
import Leaderboard from './components/Leaderboard';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      {user ? (
        <Board user={user} />
      ) : (
        <div>
          <div>Please log in to continue</div>
          <Login setUser={setUser} />
        </div>
      )}
      <Leaderboard />
    </div>
  );
}

export default App;
