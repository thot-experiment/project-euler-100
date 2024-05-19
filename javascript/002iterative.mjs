let sum = 0
for (let [a,b] = [0,1]; b < 4000000; ([a,b] = [b,a+b])) b%2?0:sum+=b

console.log(sum)
