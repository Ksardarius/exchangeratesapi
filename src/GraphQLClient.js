import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { assign } from 'lodash/fp'

const SERVICE_URL = 'https://api.exchangeratesapi.io/latest'

const typeDefs = gql`
  scalar JSON
  scalar Date

  type Query {
    exchangeRates: ExchangeRate
  }

  type ExchangeRate {
      base: String
      date: Date
      rates: JSON
  }
`;

const assingTypeName = assign({
  __typename: 'ExchangeRate'
})

function timeout (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const creteGraphQLClient = () => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    resolvers: {
      Query: {
        exchangeRates: async () => {
          const response = await fetch(SERVICE_URL)
          await timeout(1000);
          if (response.ok) {
            const r = await response.json();
            return assingTypeName(r)
          } else {
            throw new Error('Service call problem')
          }
        }
      }
    },
    typeDefs
  });

  return client;
}