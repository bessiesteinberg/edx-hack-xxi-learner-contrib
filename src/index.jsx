import 'babel-polyfill';
import CalendarHeatmap from 'react-calendar-heatmap';
import React from 'react';
import ReactDOM from 'react-dom';
import 'react-calendar-heatmap/dist/styles.css';
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

function getRange(count) {
  return Array.from({ length: count }, (_, i) => i);
}

const today = Date.now();

function App() {
  const randomValues = getRange(200).map(index => ({
    date: shiftDate(today, -index),
    count: getRandomInt(0, 3),
  }));
  return (
    <CalendarHeatmap
      startDate={shiftDate(today, -150)}
      endDate={today}
      values={randomValues}
      classForValue={value => `color-${value.count}`}
      showMonthLabels
      showWeekdayLabels
      horizontal={false}
    />

  );
}

ReactDOM.render(<App />, document.getElementById('root'));
