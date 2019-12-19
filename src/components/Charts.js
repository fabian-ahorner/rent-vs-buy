import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useFormatter } from '../components/Money';
import {
  getMonthlyBuyCost,
  getMonthlyBuyCosts,
  getMonthlyRentCost
} from '../state/values/selectors';
import { useSelector } from 'react-redux';
import { Area, AreaChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

export default function Charts() {
  const classes = useStyles()
  const theme = useTheme()

  const monthlyRentCost = useSelector(getMonthlyRentCost)
  const monthlyBuyCost = useSelector(getMonthlyBuyCost)
  const monthlyBuyCosts = useSelector(getMonthlyBuyCosts)

  const data = monthlyRentCost.map((cost, i) => ({
    rent: cost,
    buy: monthlyBuyCost[i],
    month: i
  }))
  const moneyFormatter = useFormatter()
  const costFormatter = (item) => {
    return moneyFormatter(item)
  }

  const yearFormatter = month => month / 12
  return (

    <div className={classes.chartContainer}>
      {/*<LineChart width={600}*/}
                 {/*height={300}*/}
                 {/*data={data}*/}
                 {/*margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>*/}
        {/*<Line*/}
          {/*dot={false}*/}
          {/*name="Rent"*/}
          {/*dataKey="rent"*/}
          {/*tickFormatter={costFormatter}*/}
          {/*stroke={theme.palette.rent.main}/>*/}
        {/*<Line*/}
          {/*dot={false}*/}
          {/*name="Buy"*/}
          {/*dataKey="buy"*/}
          {/*tickFormatter={costFormatter}*/}
          {/*stroke={theme.palette.buy.main}/>*/}
        {/*<CartesianGrid*/}
          {/*stroke="#ccc"*/}
          {/*strokeDasharray="5 5"/>*/}
        {/*<XAxis*/}
          {/*stroke="white"*/}
          {/*dataKey="month"*/}
          {/*tickFormatter={yearFormatter}*/}
          {/*tickSize={5}/>*/}
        {/*<YAxis*/}
          {/*stroke="white"*/}
          {/*tickFormatter={costFormatter}/>*/}
        {/*<Tooltip formatter={costFormatter}/>*/}
      {/*</LineChart>*/}

      <AreaChart
        width={600}
        height={300}
        data={monthlyBuyCosts}
        margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
        <Area
          stackId={1}
          dot={false}
          name="House cost"
          dataKey="houseCost"
          tickFormatter={costFormatter}
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          stackId={1}
          dot={false}
          name="Initial cost"
          dataKey="initialCost"
          tickFormatter={costFormatter}
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          stackId={1}
          dot={false}
          stroke="#82ca9d"
          fill="#82ca9d"
          name="Maintenance cost"
          dataKey="maintenanceCost"
          tickFormatter={costFormatter}/>
        <Area
          stroke="#ffc658"
          fill="#ffc658"
          stackId={1}
          dot={false}
          name="Interest cost"
          dataKey="interestCost"
          tickFormatter={costFormatter}/>
        <Area
          stackId={1}
          dot={false}
          name="Opportunity cost"
          dataKey="opportunityCost"
          tickFormatter={costFormatter}
          stroke={theme.palette.buy.main}/>
        <CartesianGrid
          stroke="#ccc"
          strokeDasharray="5 5"/>
        <XAxis
          stroke="white"
          dataKey="month"
          tickFormatter={yearFormatter}
          tickSize={5}/>
        <YAxis
          stroke="white"
          tickFormatter={costFormatter}/>
        <Tooltip formatter={costFormatter}/>
      </AreaChart>
    </div>
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