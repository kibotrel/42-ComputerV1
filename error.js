const ErrorDict = {
	// Arguments
	illegalArgument: `
Illegal argument: one ore more parameters in the command line are not well formated.

Expected:
  - flag     : -<flagName>
  - variable : <variableName>="variableValue"

Examples:
  - flag     : -help
  - variable : equation="3 * X^2 + 2 * X^1 + 1 = 9 X^1"
`
}

const errorHandler = (error, details) => {
	const reason = ErrorDict[error]

	console.log(reason)
	process.exit()
}

module.exports = { errorHandler }
