import React from 'react'
import { makeStyles } from '@material-ui/core';
import ConnectedTextField from './ConnectedTextField';
import ValueCollection from './ValueCollection';

export default function MarketValues({ values }) {
  return (
    <ValueCollection>
      {/*<ConnectedTextField*/}
        {/*valueKey="mortgageAmount"*/}
        {/*type='money'*/}
        {/*step={5000}*/}
        {/*label="Mortgage amount"*/}
      {/*/>*/}
      <ConnectedTextField
        valueKey="mortgageHousePrice"
        type='money'
        step={5000}
        label="House price"
      />
      <ConnectedTextField
        valueKey="mortgageDeposit"
        type='money'
        step={500}
        label="Deposit"
      />
      <ConnectedTextField
        valueKey="mortgageYears"
        step={1}
        label="Years"
      />
      <ConnectedTextField
        valueKey="mortgageInterest"
        step={0.01}
        max={10}
        type='percent'
        label="Interest"
      />
    </ValueCollection>
  )
}