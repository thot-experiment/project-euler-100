let sum = 0
for (let n = 0; n < 1000; n++) {
  if (!(n%3) || !(n%5)) sum += n
}
console.log(sum)
