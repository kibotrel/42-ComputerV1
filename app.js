const { solveEquation, plotEquation } = require('./computer.js')
const { parseArgs } = require('./parse.js')
const { errorHandler } = require('./error.js')
const args = parseArgs({ argv: process.argv })

if (!Object.keys(args).length || !args.equation || args.h) {
	errorHandler('usageMessage')
} else {
	const equation = solveEquation({ equation: args.equation, verbose: args.verbose })

	if (args.graph)
		plot(equation)
}
