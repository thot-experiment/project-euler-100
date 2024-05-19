let recursiveEven = (max, state = [0,2],acc = 0) => {
  if (state[1] > max) {
    return acc
  } else {
    state = [state[1],state[1]*4+state[0]]
    acc+=state[0]
    return recursiveEven(max,state,acc)  
  }
}
let ans = recursiveEven(4000000)
console.log(ans)
