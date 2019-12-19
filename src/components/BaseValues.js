import React from 'react'
import { makeStyles } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import CompareIcon from '@material-ui/icons/Timeline';
import Money from './Money';
import ConnectedTextField from './ConnectedTextField';
import { useSelector } from 'react-redux';
import { getMonthlyMortgagePayment } from '../state/values/selectors';

export default function BaseValues({ className }) {
  const classes = useStyles()
  const monthlyMortgagePayment = useSelector(getMonthlyMortgagePayment)

  return (
    <div className={`${classes.header} ${className}`}>
      <div className={classes.inputContainer}>
        <div className={classes.rentContainer}>
          <Typography variant="h6" color="inherit">
            Rent
            {/*(<Money value={values.rent.monthlyRent}/>)*/}
          </Typography>
          <div className={classes.inputRow}>
            <ConnectedTextField
              valueKey='rentAmount'
              money
              label="Rent / Month"
            />
            <ConnectedTextField
              valueKey='rentDeposit'
              percentage
              label="Rent deposit"
            />
          </div>
        </div>
        <div className={classes.buyContainer}>
          <Typography variant="h6">
            Buy (<Money value={monthlyMortgagePayment}/>)
          </Typography>
          <div className={classes.inputRow}>
            <ConnectedTextField
              valueKey='mortgageAmount'
              money
              label="Mortgage amount"
            />
            <ConnectedTextField
              ConnectedTextField
              valueKey='mortgageDeposit'
              money
              label="Deposit"
            />
          </div>
          <div className={classes.inputRow}>
            <ConnectedTextField
              valueKey='mortgageYears'
              label="Years"
            />
            <ConnectedTextField
              valueKey='mortgageInterest'
              percentage
              label="Interest"
            />
          </div>
        </div>
      </div>

      <Fab variant="extended" color={'primary'} className={classes.compareButton}>
        Compare
        <CompareIcon />
      </Fab>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  header: {
    color: theme.palette.secondary.contrastText,
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  headline: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: theme.spacing(3),
  },
  title: {
    // color: theme.palette.primary.main,
    // fontFamily: 'Cinzel, serif',
    fontFamily: 'Montserrat, serif',
    textAlign: 'start'
  },
  icon: {
    // color: theme.palette.primary.main,
    color: theme.palette.secondary.contrastText,
    height: '4rem',
    width: '4rem',
    marginRight: theme.spacing(2),
    marginBottom: '-0.2rem'
  },
  inputRow: {
    paddingBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
    '& > div': {
      marginRight: theme.spacing(2),
      flex: '1',
    }
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    '&>div': {
      margin: theme.spacing(1, 2),
      maxWidth: 512,
      flexBasis: 256,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  },
  compareButton: {
    alignSelf: 'flex-end',
    marginTop: theme.spacing(2),
    '& svg': {
      marginLeft: theme.spacing(1)
    }
  }
}))
