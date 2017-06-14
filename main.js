var randomTimes = 10000
var winRecords = []
var suits = ['spade', 'heart', 'club', 'diamond']
var values = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']
var allCards = arrayMultiply(suits, values)
var playerCount = 0
var handCards = []
var publicCards = []

var chosen = document.getElementById('chosen')
var info = document.getElementById('info')
var handButton = document.getElementById('chooseHandCards')
var pubButton = document.getElementById('public')
var calcButton = document.getElementById('calc')
var resetButton = document.getElementById('reset')
var pokers = document.querySelectorAll('.container .poker')

window.onload = function () {
  handButton.onclick = function () {
    var selectedPokers = document.querySelectorAll('.container .selected')
    if (selectedPokers.length !== 2) {
      alert('Please choose 2 hand cards!')
    } else {
      var s = '<div class="cards">'
      var hc = []
      for (var i = 0; i < selectedPokers.length; i++) {
        hc.push(selectedPokers[i].id.split('_'))
        selectedPokers[i].classList.remove('selected')
        s += selectedPokers[i].outerHTML
      }
      handCards.push(hc)
      s += '<span> Player ' + (playerCount + 1) + '\'s hand cards</span><hr /></div>'
      playerCount += 1
      chosen.innerHTML += s
    }
  }
  pubButton.onclick = function () {
    var selectedPokers = document.querySelectorAll('.container .selected')
    var slen = selectedPokers.length
    if (publicCards.length) {
      alert('Already choose public cards, click reset button to reset')
    } else if (slen >= 5 || slen === 0) {
      alert('Please choose 0~4 public public cards')
    } else {
      var s = '<div class="cards">'
      for (var i = 0; i < slen; i++) {
        publicCards.push(selectedPokers[i].id.split('_'))
        selectedPokers[i].classList.remove('selected')
        s += selectedPokers[i].outerHTML
      }
      s += '<span> Public cards</span><hr /></div>'
      playerCount += 1
      chosen.innerHTML += s
    }
  }
  calcButton.onclick = function () {
    if (handCards.length < 2) {
      alert('Please select 2 or more players!')
    } else {
      calcButton.disabled = 'true'
      setTimeout(function () {
        calculate()
        showResult()
      }, 100)
    }
  }
  resetButton.onclick = function () {
    winRecords = [0, 0, 0]
    playerCount = 0
    handCards = []
    publicCards = []
    chosen.innerHTML = ''
    info.innerHTML = ''
    var scards = document.getElementsByClassName('selected')
    scards = Array.prototype.slice.call(scards)
    for (var i = 0; i < scards.length; i++) {
      scards[i].classList.remove('selected')
    }
  }

  for (var i = 0; i < pokers.length; i++) {
    pokers[i].onclick = triggerSelected(i)
  }
}

function arraylize (arr) {
  var mysuits = Array(4).fill(0)
  var myvalues = Array(13).fill(0)
  for (var i = 0; i < arr.length; i++) {
    if (suits.indexOf(arr[i][0]) > -1) {
      mysuits[suits.indexOf(arr[i][0])] += 1
    }
    if (values.indexOf(arr[i][1]) > -1) {
      myvalues[values.indexOf(arr[i][1])] += 1
    }
  }
  return [mysuits, myvalues]
}

function getCardsValue (arr) {
  return detect(arraylize(arr))[1]
}

function triggerSelected (i) {
  return function () {
    pokers[i].classList.toggle('selected')
  }
}

function showResult () {
  var s = ''
  for (var i = 0; i < winRecords.length; i++) {
    s += '<tr><td>' + (i + 1) + '</td><td>' +
    (winRecords[i] / randomTimes) + '</td></tr>'
  }
  info.innerHTML = s
  calcButton.disabled = ''
}

function calculate () {
  winRecords = Array(handCards.length).fill(0)
  var allSelectedCards = []

  for (var i = 0; i < handCards.length; i++) {
    for (var j = 0; j < handCards[i].length; j++) {
      allSelectedCards.push(handCards[i][j])
    }
  }

  allSelectedCards = allSelectedCards.concat(publicCards)
  var leftCards = arrayWithout(myConcat(allCards), myConcat(allSelectedCards))

  for (var index = 0; index < randomTimes; index++) {
    var randomPickedCards = []
    var pubCardsCopy = publicCards.slice(0)
    var randomPickedNums = randomPick(leftCards.length, 5 - publicCards.length)
    for (i = 0; i < randomPickedNums.length; i++) {
      randomPickedCards.push(leftCards[randomPickedNums[i]])
    }
    for (i = 0; i < randomPickedCards.length; i++) {
      pubCardsCopy.push(randomPickedCards[i].split('_'))
    }

    var winners = whoWin(pubCardsCopy, handCards)
    for (i = 0; i < winners.length; i++) {
      winRecords[winners[i]]++
    }
  }
}

// 输入5张公共牌和所有玩家手牌，输出胜利的玩家(们)的index数组
function whoWin (pubCards, handCards) {
  var combs = combination([0, 1, 2, 3, 4, 5, 6], 5)
  var maxes = Array(handCards.length).fill(0)
  for (var i = 0; i < handCards.length; i++) {
    var sevenCards = pubCards.concat(handCards[i])
    for (var j = 0; j < combs.length; j++) {
      var fiveCards = []
      for (var k = 0; k < combs[j].length; k++) {
        fiveCards.push(sevenCards[combs[j][k]])
      }
      var cardsValue = getCardsValue(fiveCards)
      if (maxes[i] < cardsValue) {
        maxes[i] = cardsValue
      }
    }
  }
  var result = []
  var max = Math.max.apply(null, maxes)
  maxes.map(function (x, i) {
    if (x === max) {
      result.push(i)
    }
  })
  return result
}
