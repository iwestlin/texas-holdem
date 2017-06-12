function detectTonghua (mysuits) {
  for (var i = 0; i < mysuits.length; i++) {
    if (mysuits[i] === 5) {
      return true
    }
  }
}

function detectShunzi (myvalues) {
  var continueNum = 0
  for (var i = 0; i < myvalues.length; i++) {
    if (myvalues[i] === 1) {
      if (myvalues[i + 1] === 1) {
        continueNum++
      }
    }
  }
  return (continueNum === 4)
}

function detectSitiao (myvalues) {
  var maxNum = Math.max.apply(null, myvalues)
  if (maxNum === 4) {
    return true
  }
}

function detectHulu (myvalues) {
  var maxNum = Math.max.apply(null, myvalues)
  var myvaluesCopy = myvalues.slice(0)
  if (maxNum === 3) {
    myvaluesCopy[myvaluesCopy.indexOf(maxNum)] = 0
    if (Math.max.apply(null, myvaluesCopy) === 2) {
      return true
    }
  }
}

function detectSantiao (myvalues) {
  var maxNum = Math.max.apply(null, myvalues)
  var myvaluesCopy = myvalues.slice(0)
  if (maxNum === 3) {
    myvaluesCopy[myvaluesCopy.indexOf(maxNum)] = 0
    if (Math.max.apply(null, myvaluesCopy) < 2) {
      return true
    }
  }
}

function detectLiangdui (myvalues) {
  var maxNum = Math.max.apply(null, myvalues)
  var myvaluesCopy = myvalues.slice(0)
  if (maxNum === 2) {
    myvaluesCopy[myvaluesCopy.indexOf(maxNum)] = 0
    if (Math.max.apply(null, myvaluesCopy) === 2) {
      return true
    }
  }
}

function detectDuizi (myvalues) {
  var maxNum = Math.max.apply(null, myvalues)
  var myvaluesCopy = myvalues.slice(0)
  if (maxNum === 2) {
    myvaluesCopy[myvaluesCopy.indexOf(maxNum)] = 0
    if (Math.max.apply(null, myvaluesCopy) < 2) {
      return true
    }
  }
}

function detectAShunzi (mysizes) {
  return (mysizes.join('') === '1000000001111')
}

function detect (arr) { // 判断牌型为levels[i]
  var high = 0 // 初始值为高牌
  var arrValue = arr[1].join('')
  var myArrValue = parseInt(arrValue)

  function toNum (i) {
    return 12 - parseInt(arr[1].indexOf(i))
  }
  if (detectTonghua(arr[0])) { // 同花,同类可直接比大小
    high = 5
    myArrValue = high * 1e13 + parseInt(arrValue)
  }
  if (detectShunzi(arr[1])) { // 顺子，可比
    high = 4
    myArrValue = high * 1e13 + parseInt(arrValue)
  }
  if (detectAShunzi(arr[1])) { // A,2,3,4,5
    high = 4
    myArrValue = high * 1e13
  }
  if (detectTonghua(arr[0]) && detectShunzi(arr[1])) { // 同花顺，可比
    high = 8
    myArrValue = high * 1e13 + parseInt(arrValue)
  }
  if (detectTonghua(arr[0]) && detectAShunzi(arr[1])) { // A,2,3,4,5
    high = 8
    myArrValue = high * 1e13
  }
  if (detectSitiao(arr[1])) { // 四条，不可比
    high = 7
    myArrValue = high * 1e13 + toNum(4) * 100 + toNum(1)
  }
  if (detectHulu(arr[1])) { // 葫芦，不可比
    high = 6
    myArrValue = high * 1e13 + toNum(3) * 100 + toNum(2)
  }
  if (detectSantiao(arr[1])) { // 三条，不可比
    high = 3
    myArrValue = high * 1e13 + toNum(3) * 1e11 + parseInt(arrValue) / 100
  }
  if (detectLiangdui(arr[1])) { // 两对，不可比
    high = 2
    var arrCopy = arr[1].slice(0)
    arrCopy[arrCopy.indexOf(1)] = 0
    myArrValue = high * 1e13 + parseInt(arrCopy.join('')) + (toNum(1) / 100)
  }
  if (detectDuizi(arr[1])) { // 对子，不可比
    high = 1
    myArrValue = high * 1e13 + toNum(2) * 1e11 + parseInt(arrValue) / 100
  }
  return [high, myArrValue]
}
