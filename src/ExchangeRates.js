import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Loader from 'react-loader-spinner'
import { get, keys } from 'lodash/fp'

export const EXCHANGE_RATES = gql`
  query exchangeRates($skip: Boolean!) {
    exchangeRates @client @skip(if: $skip) {
      base
      date
      rates
    }
  }
`;

const ExchangeRates = ({onError}) => {
  const [loadData, setLoadData] = useState(false)

  const { loading, error, data } = useQuery(EXCHANGE_RATES, {
    variables: {
      skip: !loadData,
    }
  });

  if (loading) {
    return <div className="loader"><Loader
      type="Puff"
      color="#00BFFF"
      height={100}
      width={100}
    /></div>
  }

  if (error) {
    onError && onError(error.message, 'Error');
  }

  return <div className="container mt-5">
    <div className="row">
      <button type="button" className="btn btn-primary btn-lg btn-block" onClick={_ => {setLoadData(true)}}>
        Get rates
      </button>
    </div>
    {data && data.exchangeRates && (<React.Fragment>
      <div className="row mt-3" data-testid="exchange-main-row">
        <div className="col-sm-6">
          <span>Base: <strong>{get('exchangeRates.base', data)}</strong></span>
        </div>
        <div className="col-sm-6">
          Date: <strong>{get('exchangeRates.date', data)}</strong>
        </div>
      </div>
      <div className="row mt-3">
        {get('exchangeRates.rates', data) && (

          keys(data.exchangeRates.rates).map((key, i) => (
            <div key={i} className="col-sm-3">
              {key}:<strong className="pl-1">{data.exchangeRates.rates[key]}</strong>
            </div>
          ))

        )}
      </div>
    </React.Fragment>)}
  </div>
}

export default ExchangeRates