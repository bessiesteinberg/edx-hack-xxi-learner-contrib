import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import LearnerCompletionsVisualization from './components/LearnerCompletionsVisualization';

import './App.scss';

const API_HOST = '18.30.43.13';

const today = Date.now();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completionData: null,
    };
  }

  componentDidMount() {
    axios.get(`http://${API_HOST}:18000/api/completion/v1/user-completion/staff`).then((res) => {
      this.setState({ completionData: res.data });
    });
  }

  render() {
    const { completionData } = this.state;

    if (completionData) {
      return (
        <LearnerCompletionsVisualization
          completionData={completionData}
        />
      );
    }
    return null;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
