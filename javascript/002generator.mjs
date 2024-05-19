let fibe = (max = 4000000) => {
  let evenFib = function* (){
    let a = [0,2]
    while (1) {
      yield a[0]
      a = [a[1],a[1]*4+a[0]]
    }
  }
  let evens = evenFib()
  let acc = 0
  let s = evens.next()
  while(s.value < max){
    acc+=s.value
    s = evens.next()
    }
  return acc
}

console.log(fibe())
