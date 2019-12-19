import React from 'react'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx'
import ConnectedTextField from './ConnectedTextField';

export default function MarketValues({ values }) {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)
  const handleExpandClick= React.useCallback(() => setExpanded(!expanded), [expanded])

  return (<>
    <Card square className={classes.summaryContainer}>
      <Typography>Test</Typography>
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </IconButton>
    </Card>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <Card square className={classes.contentContainer}>
        <ConnectedTextField
          valueKey='savingsInterest'
          label="Savings interest"
          percentage
        />
        <ConnectedTextField
          label="House growth"
          valueKey={'houseGrowth'}
          percentage
        />
      </Card>
    </Collapse>
  </>)
}

const useStyles = makeStyles(theme => ({
  contentContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: theme.spacing(1,2),
  },
  summaryContainer: {
    display: 'flex',
    padding: theme.spacing(.5,2),
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}))