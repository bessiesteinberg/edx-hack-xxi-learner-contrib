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
  return `${newDate.getUTCFullYear()}-${newDate.getUTCMonth()}-${newDate.getUTCDate()}`;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

const today = Date.now();

function App() {
  function randomValues(numDays) {
    const blockTypes = ['html', 'video', 'problem'];
    const courseNames = ['Transfiguration 301', 'Potions 301', 'Arithmency 101'];
    const values = [];
    for (let i = numDays; i >= 0; i -= 1) {
      const currValue = {
        date: shiftDate(today, -i),
        count: getRandomInt(0, 3),
        completions: [],
      };
      for (let j = 0; j < currValue.count; j += 1) {
        currValue.completions.push({
          block_type: blockTypes[getRandomInt(0, 2)],
          block_key: `block_key_${getRandomInt(0, 99999)}`,
          block_name: `Block Name ${getRandomInt(0, 99999)}`,
          course_name: courseNames[getRandomInt(0, 2)],
        });
      }
      values.push(currValue);
    }
    return values;
  }
  return (
    <LearnerCompletionsVisualization
      completionData={randomValues(300)}
    />
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
