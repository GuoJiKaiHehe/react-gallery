import React, { Component } from 'react';

import './App.css';
import './less/a.less'
import Stage from './components/Stage'

class App extends Component {
  render() {
    return (
      <div className="App">
       <Stage />
      </div>
    );
  }
}

export default App;
