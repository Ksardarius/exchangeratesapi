import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import ExchangeRates, { EXCHANGE_RATES } from './ExchangeRates'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import { NotificationContainer } from 'react-notifications';
import wait from 'waait';

const mocks = [
  {
    request: {
      query: EXCHANGE_RATES,
      variables: {
        skip: false,
      },
    },
    result: {
      data: {
        "exchangeRates": {
          "base": "EUR",
          "date": "2019-11-22",
          "rates": {
            "CAD": 1.4679,
            "HKD": 8.6525
          },
        }
      },
    },
  }
];

it('initially there should be a button', async () => {
  const { getByText, asFragment } = render(
    <MockedProvider mocks={[]} addTypename={false}>
      <ExchangeRates />
    </MockedProvider>
  )

  expect(getByText('Get rates')).toBeDefined()
});

it('"Loading" UI component should be shown while data is fetched', async () => {
  const { getByText, asFragment } = render(
    <MockedProvider mocks={[]} addTypename={false}>
      <ExchangeRates />
    </MockedProvider>
  )

  fireEvent.click(getByText('Get rates'))

  expect(asFragment()).toMatchSnapshot()
});

it('data is fetched when the button is clicked', async () => {
  const { getByText, getByTestId, asFragment } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ExchangeRates />
    </MockedProvider>
  )

  fireEvent.click(getByText('Get rates'))
  await wait(0);

  await waitForElement(() => getByTestId('exchange-main-row'))

  expect(asFragment()).toMatchSnapshot()
});

it('error modal should be shown when data fetch fails', async () => {
  const errorMocks = [
    {
      request: {
        query: EXCHANGE_RATES,
        variables: {
          skip: false,
        },
      },
      error: new Error('Service error'),
    }
  ];

  const onError = jest.fn()

  const { getByText } = render(
    <MockedProvider mocks={errorMocks} addTypename={false}>
      <React.Fragment>
        <NotificationContainer />
        <ExchangeRates onError={onError} />
      </React.Fragment>
    </MockedProvider>
  )

  fireEvent.click(getByText('Get rates'))

  await wait(0);

  expect(onError).toHaveBeenCalled()
  expect(onError.mock.calls[0][0]).toBe('Network error: Service error');
  expect(onError.mock.calls[0][1]).toBe('Error');
});
