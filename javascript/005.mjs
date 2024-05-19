let naive_divis = n => {
  const divisors = Array.from({length:n}, (_,i) => i+1)
  const max = divisors.reduce((a,b) => a*b)
  for (let i=1; i < max; i++){
    let number = i * n
    let divisible = divisors.map(n => number%n).reduce((c,v) => c || v)
    if (!divisible) return number
  }
}
console.log(divis(20))
