import React from 'react'
import { makeStyles } from '@material-ui/core';
import ConnectedTextField from './ConnectedTextField';

export default function ValueCollection({ children }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {children}
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignSelf: 'stretch',
    // alignItems: 'center',
    justifyContent: 'space-around',
    padding: theme.spacing(4, 8),
    margin: '0 auto',
    maxWidth: 512*2,
    flexDirection: 'column'
    // flexWrap: 'wrap'
  },
}))