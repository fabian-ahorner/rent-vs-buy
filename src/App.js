import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import './App.css';
import Theme from './Theme';
import MortgageValues from './components/MortgageValues';
import MarketValues from './components/MarketValues';
import Charts from './components/Charts/Charts';
import YearsPicker from './components/YearsPicker';
import Header from './components/Header';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import RentValues from './components/RentValues';
import BillsValues from './components/BillsValues';

export default function App() {
  const classes = useStyles()

  const [selectedTab, setSelectedTab] = React.useState('mortgage')
  const handleTabChange = React.useCallback((event, newValue) => {
    setSelectedTab(newValue)
  }, [])

  const tabContent = React.useMemo(() => {
    switch (selectedTab) {
      case 'mortgage':
        return <MortgageValues/>
      case 'market':
        return <MarketValues/>
      case 'rent':
        return <RentValues/>
      case 'bills':
        return <BillsValues/>
    }
  }, [selectedTab])

  return (
    <div className="App">
      <Header/>
      <Theme dark>
        <header className={classes.header}>
          <Charts/>
          <Paper square>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              centered
              aria-label="simple tabs example">
              <Tab label="Mortgage" value="mortgage"/>
              <Tab label="Fees / Bills" value="bills"/>
              <Tab label="Rent" value="rent"/>
              <Tab label="Market" value="market"/>
            </Tabs>
          </Paper>
        </header>
      </Theme>
      <div className={classes.values}>
        {tabContent}
      </div>

      {/*<content className={classes.content}>*/}
      {/*<Typography variant={'h2'}>*/}
      {/*<Money value={monthlyMortgagePayment}/>*/}
      {/*</Typography>*/}
      {/*</content>*/}
    </div>
  );
}


const useStyles = makeStyles(theme => ({
  header: {
    background: `linear-gradient(135deg, ${theme.palette.rent.main}, ${theme.palette.buy.main})`,
    paddingTop: theme.spacing(2),
    position: 'sticky',
    top: 0,
    zIndex: 10
  },
  content: {
    padding: theme.spacing(4, 6)

  },
  chartContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  values: {
    background: theme.palette.background.default
  },
}))