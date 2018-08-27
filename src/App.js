import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Routes from './Routes';

class App extends Component {
  state = {
    showSearchPage: false,
    books: []
  }

  render() {
    return (
      <div className="app">
        <Routes />
      </div>
    );
  }
}

export default App;