import TextField from '@material-ui/core/TextField/TextField';
import React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import { getValueKeyValue } from '../state/values/selectors';
import { setValue } from '../state/values';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const percentageAdornment = <InputAdornment position="end">%</InputAdornment>
const currencyAdornment = <InputAdornment position="start">£</InputAdornment>

function ConnectedTextField({ valueKey, setValue, percentage, money, ...rest }) {
  const handleChange = React.useCallback(e => {
    console.log("Change")
    setValue({
      valueKey,
      value: e.target.value
    })
  }, [valueKey])
  return (<TextField
    type="number"
    InputProps={{
      endAdornment: percentage ? percentageAdornment : undefined,
      startAdornment: money ? currencyAdornment : undefined
    }}
    onChange={handleChange}
    margin="normal"
    variant="outlined"
    {...rest}
  />)
}


export default connect(
  createStructuredSelector({value: getValueKeyValue}),
  { setValue: setValue }
)(ConnectedTextField)