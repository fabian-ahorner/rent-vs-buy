export function calculateMonthlyPayment(principal, interest, months){
  if (interest === 0) {
    return principal / months
  } else {
    const r = interest / 1200
    return principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1)
  }
}