import React, {useState} from 'react';
import './Leaderboard.css';

function Leaderboard(props) {
  const [rankings, setRankings] = useState([[1, "Naman", 100], [2, "Anshul", 99], [3, "Kris", 95], [4, "David", 5]])
  
  return (
    <div>
      <table>
        <tr>
          <td className="tableTitle"><b> Rank </b></td>
          <td className="tableTitle"><b> Name </b></td>
          <td className="tableTitle"><b> Score </b></td>
        </tr>
        {rankings.map(rank =>
          <tr>
            <td>{rank[0]}</td>
            <td>{rank[1]}</td>
            <td>{rank[2]}</td>
          </tr>
        )}
      </table> 
    </div>
  );
}

export default Leaderboard;
