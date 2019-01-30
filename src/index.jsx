import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import LearnerCompletionsVisualization from './components/LearnerCompletionsVisualization';

import './App.scss';

// const endDate = Date.now();
// const startDate = endDate.setFullYear(endDate.getFullYear() - 1);


function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

const today = Date.now();

function App() {
  // const blockTypes = ['html', 'video', 'problem'];
  function randomValues(numDays) {
    const values = [];
    for (let i = numDays; i >= 0; i -= 1) {
      values.push({
        date: shiftDate(today, -i),
        count: getRandomInt(0, 3),
      });
    }
    return values;
  }

  //
  //   return getRange(200).map(index => ({
  //     date: shiftDate(today, -index),
  //     count: getRandomInt(0, 3),
  //     completions: getRange(this.count).map({
  //       block_type: blockTypes[getRandomInt(0, 2)],
  //       block_key: `block_key_${getRandomInt(0, 99999)}`,
  //       block_name: `Block Name ${getRandomInt(0, 99999)}`,
  //     }),
  //   }));
  // }
  return (
    <LearnerCompletionsVisualization
      completionData={randomValues(300)}
    />
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
