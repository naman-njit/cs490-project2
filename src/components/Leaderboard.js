import React, { useState, useEffect } from 'react';

import './Leaderboard.css';

function Leaderboard(props) {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    fetch('/api/leaderboard/list').then((response) => {
      response.json().then((data) => setRankings(data.ranks));
    });
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td className="tableTitle">
              <b> Rank </b>
            </td>
            <td className="tableTitle">
              <b> Name </b>
            </td>
            <td className="tableTitle">
              <b> Score </b>
            </td>
          </tr>
        </thead>
        <tbody>
          {rankings.map((entry) => (
            <tr key={entry.name}>
              <td>{entry.rank}</td>
              <td>{entry.name}</td>
              <td>{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
