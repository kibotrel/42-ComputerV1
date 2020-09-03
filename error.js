const ErrorDict = {
	// Arguments
	illegalArgument: `
\x1b[31;1mIllegal argument:\x1b[0m one ore more parameters in the command line are not well formated.

\x1b[1mExpected:\x1b[0m
  - flag     : -\x1b[1mflagName\x1b[0m
  - variable : \x1b[1mvariableName\x1b[0m="\x1b[32;1mvariableValue\x1b[0m"

\x1b[1mExamples:\x1b[0m
  - flag     : \x1b[1m-help\x1b[0m
  - variable : \x1b[1mequation\x1b[0m="\x1b[32;1m1 * X^2 + 2 * X^1 = 9 X^0\x1b[0m"
`,
	usageMessage: `
\x1b[1mUsage:\x1b[0m
  node app.js [\x1b[1m-vg\x1b[0m][\x1b[1m-h\x1b[0m] \x1b[1mequation\x1b[0m="<\x1b[32;1mequation\x1b[0m>"

\x1b[1mArguments:
  - Flags:\x1b[0m

    \x1b[1;4mDescription:\x1b[0m

    A comand line flag looks like : -\x1b[1mflagName\x1b[0m. It automatically adds a
    \x1b[1mboolean (flagName)\x1b[0m set to \x1b[33;1mtrue\x1b[0m to the argument object.

    \x1b[1;4mExample:\x1b[0m

    node app.js \x1b[1m-h\x1b[0m

    \x1b[1;4mSupported options:\x1b[0m

    \x1b[1m-h\x1b[0m  Displays this help menu.
    \x1b[1m-v\x1b[0m  Adds more verbose to the equation solving process.
    \x1b[1m-g\x1b[0m  Plots the reduced equation on a graph.

  \x1b[1m- Variables\x1b[0m

    \x1b[1;4mDescription:\x1b[0m

    A command line variable looks like : \x1b[1mvariableName\x1b[0m="\x1b[32;1mvariableValue\x1b[0m".
    It automatically adds a \x1b[1mstring (variableName)\x1b[0m set to \x1b[32;1mvariableValue\x1b[0m
    to the argument object.

    \x1b[1;4mExample:\x1b[0m

    node app.js \x1b[1mequation\x1b[0m="\x1b[32;1m1 * X^2 + 2 * X^1 = 9 X^0\x1b[0m"

    \x1b[1;4mSupported options:\x1b[0m

    \x1b[1mequation\x1b[0m  The equation to solve. It must follow this scheme :
              \x1b[2mPolynom1 ± ... ± PolynomN = PolynomN+1 ± ... ± PolynomN+M\x1b[0m
              in which each \x1b[1mPolynom\x1b[0m is of form \x1b[2mf * X^p\x1b[0m or \x1b[2mfX^p\x1b[0m where 'f'
              is the factor and 'p' is the power of the given polynom.

`
}

const errorHandler = (error, details) => {
	const reason = ErrorDict[error]

	console.log(reason)
	process.exit()
}

module.exports = { errorHandler }
