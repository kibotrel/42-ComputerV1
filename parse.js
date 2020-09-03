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
	for (let argument of argv) {
		if (argument.startsWith('-')) {
			argument = argument.substring(1)
			if (argument.match('^[a-zA-Z]+$'))
				Object.assign(args, { [argument.toLowerCase()]: true })
			else
				errorHandler('illegalArgument')
		} else if (argument.includes('=') && isValidVariable(argument))
			Object.assign(args, { [argument.substring(0, argument.indexOf('=')).toLowerCase()]: argument.substring(argument.indexOf('=') + 1).toUpperCase() })
		else
			errorHandler('illegalArgument')
	}
	return args
}

const parsePolynom = (polynom) => {
	if (polynom === '*')
		errorHandler('badPolynom')
}

const parseEquation = ({ equation, verbose }) => {
	equation = equation.replace(/\s+/g, '')
	if (!equation.includes('='))
		errorHandler('notEquation')
	if (!equation.match('^[+-=*0-9X^]+$'))
		errorHandler('forbiddenCharacters')
	equation = equation.split('=')

	const leftSide = equation[0].match(/[-+]?([0-9]*\.?[0-9]+)?(\*)?(X(\^[0-9]+)?)?/g)
	const rightSide = equation[1].match(/[-+]?([0-9]*\.?[0-9]+)?(\*)?(X(\^[0-9]+)?)?/g)

	leftSide.pop()
	rightSide.pop()
	for (const polynom of leftSide) {
		const polynomInfos = parsePolynom(polynom)
	}
	for (const polynom of rightSide) {
		const polynomInfos = parsePolynom(polynom)
	}


	return { degree: undefined, leftSide: undefined, rightSide: undefined}
}

module.exports = { parseEquation, parseArgs }
