import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'counter',
  initialState: {
    rentAmount: 900,
    rentDeposit: 100,
    mortgageAmount: 300000,
    mortgageInterest: 2.0,
    mortgageYears: 25,
    mortgageDeposit: 30000,
    houseGrowth: 1.0,
    savingsInterest: 1.0,
    years: 30,
    mortgageHousePrice: 300000,
    buyMaintenanceCosts: 2000,
    buyInitialCosts: 10000,
  },
  reducers: {
    setValue: (state, { payload }) => ({ ...state, [payload.valueKey]: payload.value }),
  }
})

export const { setValue } = slice.actions
export default slice.reducer
