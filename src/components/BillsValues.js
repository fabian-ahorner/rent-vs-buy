import React from 'react'
import { makeStyles } from '@material-ui/core';
import ConnectedTextField from './ConnectedTextField';
import ValueCollection from './ValueCollection';

export default function MarketValues({ values }) {
  return (
    <ValueCollection>
      <ConnectedTextField
        valueKey="buyMaintenanceCosts"
        step={100}
        label="Maintenance / year"
        type='money'
      />
      <ConnectedTextField
        valueKey="buyInitialCosts"
        step={100}
        label="Initial buy costs"
        type='money'
      />
    </ValueCollection>
  )
}