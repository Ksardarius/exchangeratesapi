import React from 'react';
import logo from './logo.svg';
import './App.css';

import { ApolloProvider } from '@apollo/react-hooks';
import { GraphQLClientFactory } from './GraphQLClient';
import ExchangeRates from './ExchangeRates'

function App() {

  const client = GraphQLClientFactory();

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        <ExchangeRates />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
