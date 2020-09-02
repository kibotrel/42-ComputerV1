const args = require('args-parser')(process.argv)

if (!Object.keys(args).length || !args.equation) {
	console.log('Usage:\n\tnode computer.js -equation="<equation>"')
	process.exit()
} else {
	// PROCESS EQUATION
	console.log('W.I.P')
}
