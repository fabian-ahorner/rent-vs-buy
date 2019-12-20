import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles'
import { getYears } from '../state/values/selectors';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup/ButtonGroup';
import { setValue } from '../state/values';

const YEARS_OPTIONS = [10, 30, 50]
export default function YearsPicker({className}) {
  const selectedYears = useSelector(getYears)
  const dispatch = useDispatch()
  const classes = useStyles()

  return (
    <ButtonGroup
      className={clsx(classes.root, className)}
      color="primary">
      {YEARS_OPTIONS.map(years => (
        <Button
          key={years}
          onClick={() => dispatch(setValue({ valueKey: 'years', value: years }))}
          variant={years === selectedYears && 'contained'}>
          {years} years
        </Button>
      ))}
    </ButtonGroup>
  );
}


const useStyles = makeStyles(theme => ({
  root: {
  }
}))