const { solveEquation, plotEquation } = require('./computer.js')
const { parseArgs } = require('./parse.js')
const { errorHandler } = require('./error.js')

const args = parseArgs({ argv: process.argv })

if (!Object.keys(args).length || !args.equation || args.h || args.help)
	errorHandler('usageMessage')

const equation = solveEquation({ equation: args.equation, args})

if (args.graph)
	plot(equation)
