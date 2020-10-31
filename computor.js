const solveEquation = require('./srcs/solve.js')
const plotEquation = require('./srcs/plot.js')
const { parseArgs } = require('./srcs/parse.js')
const errorHandler = require('./srcs/error.js')

const args = parseArgs({ argv: process.argv })

if (!Object.keys(args).length || !args.equation || args.h || args.help)
	errorHandler('usageMessage')

const equation = solveEquation({ equation: args.equation, args })

if (args.graph || args.g)
	plotEquation(equation)
