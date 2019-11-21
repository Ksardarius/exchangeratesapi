import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { assign } from 'lodash/fp'

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

export const GraphQLClientFactory = () => {
    const client = new ApolloClient({
        // uri: 'https://48p1r2roz4.sse.codesandbox.io',
        cache: new InMemoryCache(),
        resolvers: {
            Query: {
                exchangeRates: async (obj, args, context, info) => {
                    const response = await fetch('https://api.exchangeratesapi.io/latest')
                    if (response.ok) { // если HTTP-статус в диапазоне 200-299
                        const r = await response.json();
                        return assingTypeName(r)
                      } else {
                        alert("Error: " + response.status);
                      }
                } //({"__typename": "ExchangeRate", "rates":{"CAD":1.4561,"HKD":8.6372,"ISK":137.7,"PHP":55.809,"DKK":7.4727,"HUF":333.37,"CZK":25.486,"AUD":1.6065,"RON":4.7638,"SEK":10.7025,"IDR":15463.05,"INR":78.652,"BRL":4.5583,"RUB":70.4653,"HRK":7.4345,"JPY":120.72,"THB":33.527,"CHF":1.0991,"SGD":1.5002,"PLN":4.261,"BGN":1.9558,"TRY":6.3513,"CNY":7.7115,"NOK":10.0893,"NZD":1.7426,"ZAR":16.3121,"USD":1.1034,"MXN":21.1383,"ILS":3.8533,"GBP":0.86158,"KRW":1276.66,"MYR":4.5609},"base":"EUR","date":"2019-11-08"})
            }
        },
        typeDefs
    });

    return client;
}