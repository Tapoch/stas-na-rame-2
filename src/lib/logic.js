export const sum = (defValue, {gradation, value}) => {
  defValue[gradation] = (defValue[gradation] || 0) + value
  return defValue
}

export const recalculate = (value) => {
  //console.log('<<<')
  const gradations = Object.keys(value)
  //console.log('gradations', gradations.length)
  const leftValue = gradations.reduce((prev, current) => {
    value[current] += prev
    //console.log(value[current])
    if (value[current] >= 1000) {
      const scoreCurrent = value[current]
      value[current] = scoreCurrent % 1000
      return Math.floor(scoreCurrent / 1000)
    }
    return 0
  }, 0)
  //console.log('left', leftValue)
  if (leftValue > 0) {
    value[gradations.length] = leftValue
    value = recalculate(value)
  }
  for (const key in value) {
    if (value.hasOwnProperty(key) && value[key] === 0) {
      delete value[key]
    }
  }
  //console.log('>>>')
  return value
}

export const calculateIncome = (baseRate, level, rate = 3, gradation = 0) => {
  const levels = [...Array(level + 1).keys()].slice(1)
  return levels.reduce((prev, current) => {
    if (current === 1) {
      return {gradation, value: baseRate}
    } else {
      let newValue = prev.value * rate
      let newGradation = prev.gradation
      if (newValue >= 1000) {
        newGradation++
        newValue = parseFloat((newValue / 1000).toFixed(3))
      }
      return {gradation: newGradation, value: newValue}
    }
  }, {gradation: 0, value: 0})
}
export const checkBigger = (bigger, {gradation, value}) => {
  const maxGradation = Math.max(...Object.keys(bigger).map(gradation => parseInt(gradation)))
  if (maxGradation > gradation) {
    return true
  } else if (maxGradation === gradation) {
    return bigger[maxGradation] >= value;
  }
  return false
}

export const sub = (bigger, {gradation, value}) => {
  bigger[gradation] = (bigger[gradation] || 0) - value
  if (bigger[gradation] < 0) {
    calculateGradation(bigger, gradation)
  }
  return bigger
}

const calculateGradation = (bigger, gradation) => {
  bigger[gradation+1] = (bigger[gradation+1] || 0) - 1
  bigger[gradation] = bigger[gradation] + 1000
  if(bigger[gradation+1] < 0) {
    calculateGradation(bigger, gradation + 1)
  }
  return bigger
}