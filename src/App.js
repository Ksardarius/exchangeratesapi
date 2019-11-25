import React from 'react';
import './App.scss';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import 'react-notifications/lib/notifications.css';

import { ApolloProvider } from '@apollo/react-hooks';
import { creteGraphQLClient } from './GraphQLClient';
import ExchangeRates from './ExchangeRates'
import { NotificationManager, NotificationContainer } from 'react-notifications';

function App () {

  const client = creteGraphQLClient();

  return (
    <ApolloProvider client={client}>
      <div>
        <NotificationContainer/>
        <ExchangeRates onError={(msg, title) => NotificationManager.error(msg, title)} />
      </div>
    </ApolloProvider>
  );
}

export default App;
