import TextField from '@material-ui/core/TextField/TextField';
import Slider from '@material-ui/core/Slider';
import React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import { getValueKeyValue } from '../state/values/selectors';
import { setValue } from '../state/values';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Money from './Money';

const percentageAdornment = <InputAdornment position="end">%</InputAdornment>
const currencyAdornment = <InputAdornment position="start">£</InputAdornment>

const StyledSlider = withStyles(theme => ({
  root: {
    color: theme.palette.primary.main,
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
}))(Slider);

function ConnectedTextField({ valueKey, setValue, type, value, ...rest }) {
  const classes = useStyles()

  const [tempValue, setTempValue] = React.useState()

  const handleChange = React.useCallback(e => {
    setValue({
      valueKey,
      value: e.target.value
    })
  }, [valueKey])

  const handleSliderChange = React.useCallback((e, value) => {
    setTempValue(value)
  }, [valueKey])

  const handleSliderCommit = React.useCallback((e, value) => {
    setTempValue(undefined)
    setValue({
      valueKey,
      value: value
    })
  }, [valueKey])
  const format = React.useCallback(value => {
    switch (type) {
      case 'money':
        return <Money value={value}/>
      case 'percent':
        return `${value}%`
      default:
        return value
    }
  }, [type])
  const min = rest.min || 0
  const max = rest.max || (type === 'percent' ? 100 : Math.max(rest.step * 100, value * 2))
  const middle = max / 2 - min / 2
  const marks = React.useMemo(() => [{
    value: min,
    label: format(min),
  }, {
    value: middle,
    label: format(middle),
  }, {
    value: max,
    label: format(max),
  }], [value, format])

  return (<div className={classes.root}>
    <TextField
      type="number"
      className={classes.input}
      InputProps={{
        endAdornment: type === 'percent' ? percentageAdornment : undefined,
        startAdornment: type === 'money' ? currencyAdornment : undefined
      }}
      onChange={handleChange}
      margin="normal"
      variant="outlined"
      value={tempValue === undefined ? value : tempValue}
      {...rest}
    />
    <StyledSlider
      step={rest.step}
      defaultValue={tempValue || value || 0}
      min={min}
      max={max}
      onChangeCommitted={handleSliderCommit}
      onChange={handleSliderChange}
      marks={marks}
      className={classes.slider}/>
  </div>)
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 4),
    // margin: '0 auto',
    maxWidth: 512 * 2,
    flexWrap: 'wrap',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1, 2),
    }
  },
  input: {
    flexBasis: 128,
  },
  slider: {
    flex: 1,
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    }
  }
}))


export default connect(
  createStructuredSelector({ value: getValueKeyValue }),
  { setValue: setValue }
)(ConnectedTextField)