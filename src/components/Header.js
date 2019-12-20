import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, useRouteMatch, useLocation
} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  let location = useLocation();
  console.log(location)
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs aria-label="simple tabs example" value={location.pathname} centered>
          <Tab label="Summary" component={Link} to={'/'} value='/'/>
          <Tab label="Buy costs" component={Link} to={'/buy-costs'} value='/buy-costs'/>
          <Tab label="Rent costs" component={Link} to={'/rent-costs'} value='/rent-costs'/>
          <Tab label="Equity" component={Link} to={'/equity'} value={'/equity'}/>
          <Tab label="Rent vs Buy" component={Link} to={'/rent-vs-buy'} value={'/rent-vs-buy'}/>
        </Tabs>
      </AppBar>
    </div>
  );
}