import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import './App.css';
import Theme from './Theme';
import BaseValues from './components/BaseValues';
import MarketValues from './components/MarketValues';
import Typography from '@material-ui/core/Typography';
import Money, { useFormatter } from './components/Money';
import {
  getMonthlyBuyCost,
  getMonthlyBuyCosts,
  getMonthlyMortgagePayment,
  getMonthlyRentCost
} from './state/values/selectors';
import { useSelector } from 'react-redux';
import Charts from './components/Charts';
import YearsPicker from './components/YearsPicker';
import Header from './components/Header';

export default function App() {
  const classes = useStyles()
  const theme = useTheme()

  const monthlyRentCost = useSelector(getMonthlyRentCost)
  const monthlyBuyCost = useSelector(getMonthlyBuyCost)
  const monthlyMortgagePayment = useSelector(getMonthlyMortgagePayment)
  const monthlyBuyCosts = useSelector(getMonthlyBuyCosts)

  const data = monthlyRentCost.map((cost, i) => ({
    rent: cost,
    buy: monthlyBuyCost[i],
    month: i
  }))
  const moneyFormatter = useFormatter()
  const costFormatter = (item) => {
    return moneyFormatter(item)
  }//`£${cost}`

  const yearFormatter = month => month / 12
  return (
    <div className="App">
      <Header/>
      <Theme dark>
        <header className={classes.header}>
          <Charts/>
          <YearsPicker/>
        </header>
        <MarketValues/>
      </Theme>
      <BaseValues/>

      <content className={classes.content}>
        <Typography variant={'h2'}>
          <Money value={monthlyMortgagePayment}/>
        </Typography>
      </content>
    </div>
  );
}


const useStyles = makeStyles(theme => ({
  header: {
    background: `linear-gradient(135deg, ${theme.palette.rent.main}, ${theme.palette.buy.main})`,
    padding: theme.spacing(2, 4)
  },
  content: {
    padding: theme.spacing(4, 6)

  },
  chartContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))