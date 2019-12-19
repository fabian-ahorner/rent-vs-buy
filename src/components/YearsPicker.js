import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { getYears } from '../state/values/selectors';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup/ButtonGroup';
import { setValue } from '../state/values';

const YEARS_OPTIONS = [10, 30, 50]
export default function YearsPicker() {

  const selectedYears = useSelector(getYears)
  const dispatch = useDispatch()

  return (
    <ButtonGroup color="primary">
      {YEARS_OPTIONS.map(years => (
        <Button
          onClick={() => dispatch(setValue({ valueKey: 'years', value: years }))}
          variant={years === selectedYears && 'contained'}>
          {years} years {selectedYears}
        </Button>
      ))}
    </ButtonGroup>
  );
}


const useStyles = makeStyles(theme => ({
  chartContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: theme.spacing(2, 4)
  }
}))