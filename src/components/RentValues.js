import React from 'react'
import { makeStyles } from '@material-ui/core';
import ConnectedTextField from './ConnectedTextField';
import ValueCollection from './ValueCollection';

export default function MarketValues({ values }) {
  return (
    <ValueCollection>
      <ConnectedTextField
        valueKey="rentAmount"
        label="Rent / Month"
        step={10}
        type='money'
      />
      <ConnectedTextField
        label="Rent deposit"
        valueKey={'rentDeposit'}
        step={5}
        type='percent'
      />
    </ValueCollection>
  )
}