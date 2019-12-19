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
  createSelectors('mortgageAmount', 'mortgageDeposit', 'mortgageYears', 'mortgageInterest'),
  (mortgage, deposit, mortgageYears, interest) => {
    const principal = mortgage - deposit
    const months = mortgageYears * 12
    if (interest === 0) {
      return principal / months
    } else {
      const r = interest / 1200
      return principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1)
    }
  }
)

export const getOpportunityRentCost = createSelector(
  createSelectors('years', 'rentAmount', 'rentDeposit', 'savingsInterest'),
  (years, rent, rentDeposit, interest) => {
    console.log("rentDeposit: ", rent, rentDeposit)
    const initialCost = rent * rentDeposit / 100
    let totalCost = initialCost
    let totalOpportunityCost = 0
    return Array(years * 12 + 1).fill(0).map(() => {
      const opportunityCost = totalCost * interest / 12 / 100
      totalCost += rent + opportunityCost
      totalOpportunityCost += opportunityCost
      return totalOpportunityCost
    })
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
  [getMonthlyMortgagePayment, ...createSelectors('years', 'mortgageAmount',
    'mortgageInterest',
    'mortgageDeposit', 'savingsInterest', 'houseGrowth')],
  (monthlyPayment, years, mortgageAmount, mortgageInterest, deposit, savingsInterest, houseGrowth) => {
    let principal = mortgageAmount
    const initialCost = 10000
    let nonInvestibleAssets = 10000 + deposit
    let totalOpportunityCosts = 0
    let totalInterestCosts = 0
    let totalMaintenanceCosts = 0
    let maintenanceCost = 200
    const initialHousePrice = mortgageAmount + deposit
    let housePrice = initialHousePrice
    return Array(years * 12 + 1).fill(0).map((_, month) => {
      const interestCost = Math.max(0, mortgageInterest / 100 / 12 * principal)
      const opportunityCost = nonInvestibleAssets * savingsInterest / 12 / 100
      const houseCost = initialHousePrice - housePrice
      nonInvestibleAssets += monthlyPayment + maintenanceCost + opportunityCost
      principal -= (monthlyPayment - interestCost)
      totalMaintenanceCosts += maintenanceCost
      totalInterestCosts += interestCost
      totalOpportunityCosts += opportunityCost
      housePrice = housePrice + housePrice * houseGrowth / 12 / 100
      return {
        total: initialCost + totalOpportunityCosts + totalMaintenanceCosts + totalInterestCosts + houseCost,
        initialCost: initialCost,
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