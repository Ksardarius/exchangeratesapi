import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const EXCHANGE_RATES = gql`
  {
    exchangeRates @client {
      base
      date
      rates
    }
  }
`;

const ExchangeRates = () => {
    const { loading, error, data } = useQuery(EXCHANGE_RATES);

    return <div>1</div>
}

export default ExchangeRates