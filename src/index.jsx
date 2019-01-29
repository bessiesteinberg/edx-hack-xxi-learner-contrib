import 'babel-polyfill';
import CalendarHeatmap from 'react-calendar-heatmap';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './data/store';
import './App.scss';

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <main>
          <CalendarHeatmap
            startDate={new Date('2016-01-01')}
            endDate={new Date('2016-04-01')}
            values={[
              { date: '2016-01-01' },
              { date: '2016-01-22' },
              { date: '2016-01-30' },
              // ...and so on
            ]}
          />
        </main>
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
