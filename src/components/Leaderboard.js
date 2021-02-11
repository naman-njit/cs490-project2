import React, {useState} from 'react';
import io from 'socket.io-client';

import './Leaderboard.css';

const socket = io();

function Leaderboard(props) {
  const [rankings, setRankings] = useState([])
  
  const getRanking = () => {
    fetch('/api/leaderboard/list').then(
      (response) => {
        response.json().then((data) => setRankings(data.ranks));
      })
  };
  
  getRanking();
  
  return (
    <div>
      <table>
        <tr>
          <td className="tableTitle"><b> Rank </b></td>
          <td className="tableTitle"><b> Name </b></td>
          <td className="tableTitle"><b> Score </b></td>
        </tr>
        {rankings.map(entry =>
          <tr>
            <td>{entry.rank}</td>
            <td>{entry.name}</td>
            <td>{entry.points}</td>
          </tr>
        )}
      </table> 
    </div>
  );
}

export default Leaderboard;
