import React, {useState} from 'react';

function Leaderboard(props) {
  const [rankings, setRankings] = useState([[1, "Naman", 100], [2, "Anshul", 99], [3, "Kris", 95], [4, "David", 5]])
  
  function getRanking() {
    ;
  }
  
  return (
    <div>
      <table>
        <tr>
          <td> Rank </td>
          <td> Name </td>
          <td> Score </td>
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
