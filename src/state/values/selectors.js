import { createSelector } from 'reselect';

export const getValue = key => state => {
  return parseFloat(state.values[key]) || 0
}

export const getValueKeyValue = (state, props) => {
  return state.values[props.valueKey]
}

export const getValues = state => state.values

export const getYears = createSelector(
  [getValues],
  state => state.years
)

const createSelectors = (...keys) => keys.map(key => getValue(key))

export const getMonthlyMortgagePayment = createSelector(
  createSelectors('mortgageHousePrice', 'mortgageDeposit', 'mortgageYears', 'mortgageInterest'),
  (housePrice, deposit, mortgageYears, interest) => {
    const principal = housePrice - deposit
    const months = mortgageYears * 12
    if (interest === 0) {
      return principal / months
    } else {
      const r = interest / 1200
      return principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1)
    }
  }
)

export const getMonthlyRentCost = createSelector(
  createSelectors('years', 'rentAmount', 'rentDeposit', 'savingsInterest'),
  (years, rent, rentDeposit, interest) => {
    console.log("rentDeposit: ", rent, rentDeposit)
    const initialCost = rent * rentDeposit / 100
    let totalCost = initialCost
    return Array(years * 12 + 1).fill(0).map(() => {
      totalCost += rent + totalCost * interest / 12 / 100
      return totalCost
    })
  }
)

export const getMonthlyBuyCosts = createSelector(
  [getMonthlyMortgagePayment, ...createSelectors('years', 'mortgageHousePrice',
    'mortgageInterest',
    'mortgageDeposit', 'savingsInterest', 'houseGrowth', 'buyMaintenanceCosts', 'buyInitialCosts')],
  (monthlyPayment, years, initialHousePrice, mortgageInterest, deposit, savingsInterest, houseGrowth, buyMaintenanceCosts, buyInitialCosts) => {
    let principal = initialHousePrice - deposit
    let nonInvestibleAssets = buyInitialCosts + deposit
    let totalOpportunityCosts = 0
    let totalInterestCosts = 0
    let totalMaintenanceCosts = 0
    let housePrice = initialHousePrice
    return Array(years * 12 + 1).fill(0).map((_, month) => {
      const interestCost = Math.max(0, mortgageInterest / 100 / 12 * principal)
      const mortgageCost = principal > 0 ? monthlyPayment : 0
      const opportunityCost = nonInvestibleAssets * savingsInterest / 12 / 100
      const houseCost = initialHousePrice - housePrice
      nonInvestibleAssets += buyMaintenanceCosts / 12 + opportunityCost + mortgageCost //+  //
      principal -= (mortgageCost - interestCost)
      totalMaintenanceCosts += buyMaintenanceCosts / 12
      totalInterestCosts += interestCost
      totalOpportunityCosts += opportunityCost
      housePrice = housePrice + housePrice * houseGrowth / 12 / 100
      return {
        total: buyInitialCosts + totalOpportunityCosts + totalMaintenanceCosts + totalInterestCosts + houseCost,
        initialCost: buyInitialCosts,
        opportunityCost: totalOpportunityCosts,
        maintenanceCost: totalMaintenanceCosts,
        interestCost: totalInterestCosts,
        houseCost: houseCost,
        month
      }
    })
  }
)


export const getMonthlyBuyCost = createSelector(
  [getMonthlyBuyCosts],
  (costs) => {
    return costs.map(c => c.total)
  }
)