//clean sheet implementation
const factor = n => {
  let limit = n
  let factors = []
  //special case for the only even prime
  if (!(n%2)) {
    factors.push(2)
    limit = limit/2
  }
  for (let f = 3; f <= limit; f+=2) {
    if (!(n%f) && f != n) {
      factors.push(f)
      limit = limit/f
    }
  }
  return factors
}

let recursive_naive = (x, i=2) => {
  while (1) {
    if (x%i === 0) {
      break
    } else {
      i++
    }
  }
  if (x === i) { 
    return [x]
  }
  return [i, ...recursive_naive(x/i, i)]
}

//console.log(factor(10))
//console.log(factor(13))
const num = 600851475143
console.log(factor(num))
console.log(recursive_naive(num))

return [
  {name: 'cleansheet', fn:factor.bind(null, num)},
  //can't bind because then it can't recurse?
  {name: 'recursive_naive', fn:() => recursive_naive(num)},
]
