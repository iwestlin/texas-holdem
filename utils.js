function randomPick (n, m) {
  if (Math.abs(parseInt(n)) !== n || Math.abs(parseInt(m)) !== m || n < m || n === 0 || m === 0) {
    console.log('randomPick的参数为两个正整数，且前者不能小于后者！')
    return
  }
  var result = []
  while (true) {
    var r = Math.floor(Math.random() * n)
    if (result.indexOf(r) === -1) {
      result.push(r)
    }
    if (result.length === m) {
      return result
    }
  }
}

Array.prototype.remove = function (val) {
  var index = this.indexOf(val)
  if (index > -1) {
    this.splice(index, 1)
  }
}

function arrayWithout (arr, deletes) {
  for (var i = 0; i < deletes.length; i++) {
    arr.remove(deletes[i])
  }
  return arr
}

function myConcat (arr) {
  var result = []
  for (var i = 0; i < arr.length; i++) {
    result.push(arr[i].join('_'))
  }
  return result
}

function combNumber (x, y) {
  var a = 1
  var b = 1
  for (var i = y; i > 0; i--) {
    a *= x
    x -= 1
    b *= i
  }
  return a / b
}

function combination (arr, num) {
  var r = [];
  (function f (t, a, n) {
    if (n === 0) {
      return r.push(t)
    }
    for (var i = 0, l = a.length; i <= l - n; i++) {
      f(t.concat(a[i]), a.slice(i + 1), n - 1)
    }
  })([], arr, num)
  return r
}

function arrayMultiply (a1, a2) {
  var result = []
  for (var i = 0; i < a1.length; i++) {
    for (var j = 0; j < a2.length; j++) {
      result.push([a1[i], a2[j]])
    }
  }
  return result
}
