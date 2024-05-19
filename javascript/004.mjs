//the lesson here is that in js the shorter your code is the faster it is
//because javascript is the slow part kekw
//
//the actual lesson is that if it's all native implementations it's faster than
//some pointer approach
const is_pal_i = n => {
  let string = n+''
  let output = true

  for (let i = 0; i < string.length/2; i++) {
    output = output && string.at(i) == string.at(-1-i)
  }

  return output
}

const is_pal_r = n => n+'' === (n+'').split('').reverse().join('')

const bigpalfac = (n,is_pal=is_pal_i) => {
  let number = parseInt(Array.from({length:n}, a => '9').join(''))

  for (let x = 0; x < number; x++) {
    for (let y = x; y >=0; y--) {
      let a = x-y
      let b = y

      if (a >= b-1) {
        break
      }

      let product = (number-a)*(number-b)
      if (is_pal(product)) return {product,a:number-a,b:number-b}
    }
  }
  return null
}

let isPal_old = x => (''+x).split('').reverse().join('') === (x+'')
let oldPal = (digits=2, isPal = isPal_old) => {
  let max = parseInt(new Array(digits).fill(9).join(''))
  let c1 = max
  let c2 = max
  let a = []
  while (c1*c2 > 0) {
  while (!isPal(c1*c2)) {
    if(c1 === c2){
      c1--
      c2 = max
    } else {
      c2--
    }
  }
  a.push([c1,c2])
  c1--
  }
  return a.reduce((a,b) => a[0]*a[1] > b[0]*b[1] ? a : b)
}

const tests = [0.0029, 29.92, 9009,1331].forEach(n => console.log(`${n} ${is_pal_r(n)}`))

console.log(bigpalfac(3))
console.log(bigpalfac(3,is_pal_r))
console.log(oldPal(3))

return [
  {name: '', fn:bigpalfac.bind(null, 3,undefined)},
  {name: 'short_pal', fn:bigpalfac.bind(null, 3, is_pal_r)},
  {name: 'old_pal', fn:oldPal.bind(null, 3,undefined)},
  {name: 'old_pal_newcheck', fn:oldPal.bind(null, 3, is_pal_i)},
]
