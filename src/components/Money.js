function format(value, currency){
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency || 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
  return formatter.format(value)
}

export function useFormatter(){
  const currency = 'GBP'
  return value => format(value, currency)
}

export default function Money({value, children, currency}){
  return format(value||children, currency)
}