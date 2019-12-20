import React from 'react';
import { Route, Switch } from "react-router-dom";
import BuyCostChart from './BuyCostsChart';
import RentCostChart from './RentCostsChart';
import RentVsBuyChart from './RentVsBuyChart';
import Summary from './Summary';

export default function Charts() {
  return (
    <Switch>
      <Route path="/">
        <Summary/>
      </Route>
      <Route path="/buy-costs">
        <BuyCostChart/>
      </Route>
      <Route path="/rent-costs">
        <RentCostChart/>
      </Route>
      <Route path="/rent-vs-buy">
        <RentVsBuyChart/>
      </Route>
    </Switch>
  );
}