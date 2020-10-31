const { plot } = require('../nodejs-plotter-fork-fix/plotter')

const plotEquation = (polynomList) =>  {
  const data = []

  for (let x = -50; x < 50; x += 1) {
    let y = 0

    for (const polynom of polynomList) {
      y += (polynom.sign * polynom.factor * Math.pow(x, polynom.power))
    }

    data.push(y)
  }

  plot({
    data,
    filename: 'graph.png',
    style: 'line',
    nokey: true,
    xlabel: 'x',
    ylabel: 'y',
    x_begin: -50,
    finish: (error, stdout, stderr) => {}
  })
}

module.exports = plotEquation