import { useState, useEffect } from "react";

import Board from './components/Board';

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
    </div>
  );
}

export default App;
