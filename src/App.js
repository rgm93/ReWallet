import React, { Component } from 'react';
import './App.css';
import ReWallet from './ReWallet';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="title">
          <br/>
        </div>
        <div className="center">
          <ReWallet />
        </div>
        <div className="disc">
          <br />
        </div>
      </div>
    );
  }
}

export default App;
