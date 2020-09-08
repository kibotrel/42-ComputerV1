const { errorHandler } = require('./error.js')

const trimFlagName = (flagString) => {
	let hyphenCount = 0

	for (character of flagString)
		if (character === '-')
			hyphenCount++
		else
			break
	if (hyphenCount <= 2)
		flagString = flagString.substring(hyphenCount)
	if (hyphenCount === 1 && flagString.length !== 1)
		errorHandler('illegalArgument')

	return flagString
}

const isValidVariable = (variableString) => {
	const element = variableString.split('=')
	const variableName = element[0]
	const variableValue = element[1]

	if (element.length === 2 || !variableName.match('^[a-zA-Z]+$') || !variableValue.length)
		return false
	else
		return true
}

const argsSanitize = (args) => {
	const flagArray = ['complex', 'c', 'fraction', 'f', 'graph', 'g', 'h', 'help', 'natural', 'n', 'pretty', 'p', 'verbose', 'v']
	const variableArray = ['equation', 'precision']

	for (const argument in args) {
		if (flagArray.includes(argument)) {
			if (typeof args[argument] !== 'boolean')
				errorHandler('illegalArgument')
		} else if (variableArray.includes(argument)) {
			if (typeof args[argument] !== 'string')
				errorHandler('illegalArgument')
		} else {
			errorHandler('illegalArgument')
		}
	}
	return args
}

const parseArgs = ({ argv }) => {
	const args = {}

	argv.splice(0, 2)
	for (let argument of argv) {
		if (argument.startsWith('-')) {
			argument = trimFlagName(argument)
			if (argument.match('^[a-zA-Z]+$'))
				Object.assign(args, { [argument.toLowerCase()]: true })
			else
				errorHandler('illegalArgument')
		} else if (argument.includes('=') && isValidVariable(argument))
			Object.assign(args, { [argument.substring(0, argument.indexOf('=')).toLowerCase()]: argument.substring(argument.indexOf('=') + 1).toUpperCase() })
		else
			errorHandler('illegalArgument')
	}
	return argsSanitize(args)
}

const parsePolynom = ({ polynom, side }) => {
	const polynomInfos = {
		polynom,
		side,
		sign: 1,
		factor: 1,
		power: 0
	}

	const foundMultiply = polynom.includes('*')
	const foundFloat = polynom.includes('.')
	const foundX = polynom.includes('X')
	const foundExponentSign = polynom.includes('^')
	const foundSign = polynom.includes('-') || polynom.includes('+')

	if (foundSign)
		polynomInfos.sign = (polynom[0] === '+' ? 1 : -1)
	if (foundX)
		polynomInfos.power = 1
	if (foundExponentSign)
		polynomInfos.power = parseInt(polynom.substring(polynom.indexOf('^') + 1))

	let factorString = (foundSign ? polynom.substring(1) : polynom.substring(0))

	if (foundMultiply)
		factorString = factorString.substring(0, factorString.indexOf('*'))
	else if (foundX)
		factorString = factorString.substring(0, factorString.indexOf('X'))

	polynomInfos.factor = (factorString.length > 0 ? parseFloat(factorString) : 1)

	return polynomInfos
}

const parsePolynomList = (equation) => {
	let sideID = 'l'
	let polynomList = []

	equation = equation.split('=')
	for (const side of equation) {
		const groups = side.match(/([+-]?(((?<!X|\d)\d+\.\d\*X\^\d+)|((?<!X|\d)\d+\*X\^\d+)|((?<!X|\d)\d+\.\d+X\^\d+)|((?<!X|\d)\d+X\^\d+)|((?<!X|\d)\d+\.\d+X)|((?<!X|\d)\d+X)|((?<!X|\d)X\^\d+)|((?<!X|\d)X)|((?<!X|\d)\d\.\d+)|((?<!X|\d)\d+)))+/g)

		if (groups.length !== 1 || groups[0].length !== side.length)
			errorHandler('badPolynom')

		const termList = side.split(/(?=[-+])/)

		for (const polynom of termList)
			polynomList.push(parsePolynom({ polynom, side: sideID }))

		sideID = 'r'
	}
	return polynomList
}

const parseEquation = ({ equation, verbose }) => {
	equation = equation.replace(/\s+/g, '')
	if (!equation.includes('='))
		errorHandler('notEquation')
	if (!equation.match('^[+-=*0-9X^]+$'))
		errorHandler('forbiddenCharacters')
	const polynomList = parsePolynomList(equation)

	return polynomList
}

module.exports = { parseEquation, parseArgs }
