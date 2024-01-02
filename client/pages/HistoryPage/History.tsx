
import React from 'react';

const History = () => {
  let historyArray: Array<string> = [];
  if (typeof window !== 'undefined') {
    historyArray = JSON.parse(localStorage.getItem('history') || '[]');
  }

  return (
    <div>
      <h1>History</h1>
      <ul>
        {historyArray.map((entry: any, index: any) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
};

export default History;
