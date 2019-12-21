import React from 'react';
import { Route, Switch } from "react-router-dom";
import BuyCostChart from './BuyCostsChart';
import RentCostChart from './RentCostsChart';
import RentVsBuyChart from './RentVsBuyChart';
import Summary from './Summary';
import YearsPicker from '../YearsPicker';
import { makeStyles } from '@material-ui/core';

export default function Charts() {
  const classes = useStyles()

  return (
    <Switch>
      <Route path="/buy-costs">
        <BuyCostChart/>
        <YearsPicker className={classes.yearPicker}/>
      </Route>
      <Route path="/rent-costs">
        <RentCostChart/>
        <YearsPicker className={classes.yearPicker}/>
      </Route>
      <Route path="/rent-vs-buy">
        <RentVsBuyChart/>
        <YearsPicker className={classes.yearPicker}/>
      </Route>
      <Route path="/">
        <Summary/>
      </Route>
    </Switch>
  );
}

const useStyles = makeStyles(theme => ({
  yearPicker: {
    marginBottom: theme.spacing(2)
  }
}))