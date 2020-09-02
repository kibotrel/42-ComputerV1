const { solveEquation, plotEquation } = require('./computer.js')
const { parseArgs } = require('./parse.js')
const args = parseArgs({ argv: process.argv })

if (!Object.keys(args).length || !args.equation || args.help) {
	console.log('Usage:\n\tnode computer.js equation="<equation>"')
	process.exit()
} else {
	const equation = solveEquation({ equation: args.equation, verbose: args.verbose })

	if (args.graph)
		plot(equation)
}
