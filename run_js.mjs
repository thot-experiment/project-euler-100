import fs from 'fs/promises'
const nolog = process.argv[2] === 'nolog'
//TODO rewrite the filter stuff this is dumb
let specific = parseInt(process.argv[2])
specific = isNaN(specific) || specific

const null_log = {log:()=>{}}

const asyncFn = async function () {}.constructor

const format_time = (ms, mag) => {
    mag = Math.log10(ms)
    if (mag < -0.2) return [ms*1000,'ns']
    if (mag < 3.0) return [ms,'ms']
    if (mag < 4.8) return [ms/1000,'s']
    if (mag < 6.1) return [ms/(1000*60),'m']
    if (mag < 6.8) return [ms/(1000*60*60),'h']
    //if (mag < 8.0) 
        return [ms/(1000*60*60*24),'d']
}

let problems = await fs.readdir('javascript')
  .then(files => 
    files.filter(file => file.slice(-4) === '.mjs' && parseInt(file.slice(0,3)))
    .reduce((acc,file) => {
      const id = file.slice(0,3)
      if (specific != true && parseInt(id) != specific) return acc
      acc[id]?acc[id].push(file):acc[id] = [file]
      return acc
    },{})
  )

for (const id in problems) {
  let solutions = problems[id]

  console.log(`euler problem ${id}`)
  for (const solution of solutions) {
    const code = await fs.readFile('javascript/'+solution)
    const func = new asyncFn('console',code.toString())
    const executed = await func(nolog?null_log:console)

    //four code paths
    //1. code is executed and doesn't return anything, assume a simple impl
    //2. code returns a function, benchmark the returned function
    //3. code returns an array of functions, benchmark each fn in array
    //4. code returns an array of objects, benchmark each obj.fn, print annotations

    let implementations

    if (typeof executed === 'function') {
      implementations = [{fn:executed}]
    } else if (typeof executed?.[0] === 'function') {
      implementations = executed.map(fn => ({fn}))
    } else if (typeof executed?.[0] === 'object') {
      implementations = executed
    } else {
      implementations = [{fn:func}]
    }

    for (const impl of implementations) {
      //number of times to run solution for benchmark
      const runs = 1000

      const start = new Date()
      let count = 0
      for (let i = 0; i < runs; i++) {
        //no log on benchmark runs
        await impl.fn(null_log)
        count++
        if (new Date()-start > 2000) {
          //console.warn(`toolong! ${count}`)
          break
        }
      }

      const time = new Date() - start
      const name = (impl.name || solution.slice(3,-4) || solution.slice(0,-4)).padEnd(14,' ').slice(0,14)

      const [runtime,units] = format_time(time/count)
      console.log(`solution ${name} took ${runtime.toFixed(1)}${units}`)
      if (impl.notes) console.log(notes)
    }
  }
  console.log()
}
