const excludedTypes = [
  'book',
  'chocolate',
  'chocolates',
  'pills',
]

const plurals = {
  boxes: 'box',
  bottles: 'bottle',
  packets: 'packet',
}

const calculateTaxRate = (excluded, imported) => {
  let taxRate = 0
  if (!excluded) taxRate = 10
  if (imported) taxRate += 5
  return taxRate
}

const calculateUnitSalesTax = (unitPrice, taxRate) => {
  let unitSalesTax = 0
  if (taxRate > 0) {
    const tax = (taxRate/100)* unitPrice
    unitSalesTax = (Math.ceil(tax*20)/20).toFixed(2)
  }
  return unitSalesTax
}

const generateLineItemInfo = lineItem => {
  const lineItemArr = lineItem.split(' ').filter(item => item !== 'at')
  const quantity = lineItemArr[0]
  const unitPrice = lineItemArr[lineItemArr.length - 1]
  
  lineItemArr.shift()
  lineItemArr.pop()

  const descriptionArr = []
  let excluded = false
  lineItemArr.forEach(element => {
    let val = element
    
    // make singular if plural
    if (Object.keys(plurals).includes(element)) {
      val = plurals[val]
    }

    descriptionArr.push(val)

    if (excludedTypes.includes(val)) excluded = true
  })

  let imported = false
  if (descriptionArr[0] === 'imported') imported = true

  const description = descriptionArr.join(' ')
  const price = quantity * unitPrice
  const taxRate = calculateTaxRate(excluded, imported)
  const salesTax = quantity * calculateUnitSalesTax(unitPrice, taxRate)
  const totalPrice = (parseFloat(price) + parseFloat(salesTax)).toFixed(2)

  return {
    lineItem: `${quantity} ${description}: ${totalPrice}`,
    salesTax,
    totalPrice,
  }
}

module.exports = lineItems => {
  const inputArr = lineItems.trim().split('\n')

  let output = ''
  let salesTaxes = 0
  let totalPrice = 0
  for (i=0; i<inputArr.length; i++) {
    const lineItemInfo = generateLineItemInfo(inputArr[i])
    output += lineItemInfo['lineItem'] + '\n'
    salesTaxes += parseFloat(lineItemInfo['salesTax'])
    totalPrice += parseFloat(lineItemInfo['totalPrice'])
  }
  output += `Sales Taxes: ${salesTaxes.toFixed(2)}\n`
  output += `Total: ${totalPrice.toFixed(2)}`

  return output
}
