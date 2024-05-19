//run export somehow
let filter = n => !(n%3) || !(n%5)
let sum = (a,b) => a+b
let example = Array.from({length:9},(_,i) => i+1)
  .filter(filter)
  .reduce(sum)

console.log(example)

let solution = Array.from({length:999},(_,i) => i+1)
  .filter(filter)
  .reduce(sum)

console.log(solution)
