export const sum = (defValue, {gradation, value}) => {
  defValue[gradation] = (defValue[gradation] || 0) + value
  return defValue
}

export const recalculate = (value) => {
  console.log('<<<')
  const gradations = Object.keys(value)
  console.log('gradations', gradations.length)
  const leftValue = gradations.reduce((prev, current) => {
    value[current] += prev
    console.log(value[current])
    if (value[current] >= 1000) {
      const scoreCurrent = value[current]
      value[current] = scoreCurrent % 1000
      return Math.floor(scoreCurrent / 1000)
    }
    return 0
  }, 0)
  console.log('left', leftValue)
  if (leftValue > 0) {
    value[gradations.length] = leftValue
    value = recalculate(value)
  }
  console.log('>>>')
  return value
}

export const calculateIncome = (baseRate, level) => {
  const levels = [...Array(level + 1).keys()].slice(1)
  return levels.reduce((prev, current) => {
    if (current === 1) {
      return {gradation: 0, value: baseRate}
    } else {
      let newValue = prev.value * 3
      let newGradation = prev.gradation
      if (newValue >= 1000) {
        newGradation++
        newValue = parseFloat((newValue / 1000).toFixed(3))
      }
      return {gradation: newGradation, value: newValue}
    }
  }, {gradation: 0, value: 0})
}