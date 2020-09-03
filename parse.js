const { errorHandler } = require('./error.js')

const isValidVariable = (variableString) => {
	const element = variableString.split('=')
	const variableName = element[0]
	const variableValue = element[1]

	if (!variableName.match('^[a-zA-Z]+$'))
		return false
	else if (!variableValue.length)
		return false
	else
		return true
}

const parseArgs = ({ argv }) => {
	const args = {}

	argv.splice(0, 2)
	try {
		for (let argument of argv) {
			if (argument.startsWith('-')) {
				argument = argument.substring(1)
				if (argument.match('^[a-zA-Z]+$'))
					Object.assign(args, { [argument.toLowerCase()]: true })
				else
					throw 'illegalArgument'
			} else if (argument.includes('=') && isValidVariable(argument))
				Object.assign(args, { [argument.substring(0, argument.indexOf('=')).toLowerCase()]: argument.substring(argument.indexOf('=') + 1).toUpperCase() })
			else
				throw 'illegalArgument'
		}
		return args
	} catch (error) {
		errorHandler(error)
	}
}

const parseEquation = ({ equation, verbose }) => {
	return { degree: undefined, leftSide: undefined, rightSide: undefined}
}

module.exports = { parseEquation, parseArgs }
