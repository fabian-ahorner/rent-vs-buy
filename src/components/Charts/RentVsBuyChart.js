import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useFormatter } from '../../components/Money';
import {
  getMonthlyRentCost,
  getTotalMonthlyBuyCost,
  getTotalMonthlyRentCost
} from '../../state/values/selectors';
import { useSelector } from 'react-redux';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

export default function RentVsBuyChart() {
  const classes = useStyles()
  const theme = useTheme()

  const monthlyRentCost = useSelector(getTotalMonthlyRentCost)
  const monthlyBuyCost = useSelector(getTotalMonthlyBuyCost)

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
      <LineChart width={600}
                 height={300}
                 data={data}
                 margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
        <Line
          dot={false}
          name="Rent"
          dataKey="rent"
          tickFormatter={costFormatter}
          stroke={theme.palette.rent.main}/>
        <Line
          dot={false}
          name="Buy"
          dataKey="buy"
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
      </LineChart>
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