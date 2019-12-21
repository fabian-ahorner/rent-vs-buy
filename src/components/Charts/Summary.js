import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import {
  getInitialBuyCost,
  getMonthlyBuyCost,
  getMonthlyMortgagePayment,
} from '../../state/values/selectors';
import { useSelector } from 'react-redux';
import Money from '../Money';

export default function Summary() {
  const classes = useStyles()
  const theme = useTheme()

  const monthlyMortgagePayment = useSelector(getMonthlyMortgagePayment)
  const monthlyBuyCosts = useSelector(getMonthlyBuyCost)
  const initialBuyCost = useSelector(getInitialBuyCost)

  return (
    <div className={classes.root}>
      <div className={classes.valueContainer}>
        <Typography
          variant="h3">
          <Money value={initialBuyCost}/>
        </Typography>
        <Typography
          className={classes.caption}
          variant="caption">
          Initial buy cost
        </Typography>
      </div>
      <div className={classes.valueContainer}>
        <Typography
          variant="h3">
          <Money value={monthlyMortgagePayment}/>
        </Typography>
        <Typography
          className={classes.caption}
          variant="caption">
          Monthly mortgage payment
        </Typography>
      </div>
      <div className={classes.valueContainer}>
        <Typography
          variant="h3">
          <Money value={monthlyBuyCosts}/>
        </Typography>
        <Typography
          className={classes.caption}
          variant="caption">
          Monthly costs
        </Typography>
      </div>
    </div>
  );
}


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    // padding: theme.spacing(2, 4)
    padding: theme.spacing(2, 2)
  },
  valueContainer: {
    color: theme.palette.text.primary,
    padding: theme.spacing(1, 1)
  },
  caption: {
    color: theme.palette.text.hint,
  }
}))