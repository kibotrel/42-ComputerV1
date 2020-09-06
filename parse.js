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

	polynomInfos.factor = parseFloat(factorString)

	return polynomInfos
}

const parsePolynomList = (equation) => {
	let sideID = 'l'
	let polynomList = []

	equation = equation.split('=')
	for (const side of equation) {
		const groups = side.match(/([+-]?((\d+\.\d\*X\^\d+)|(\d+\*X\^\d+)|(\d+\.\d+X\^\d+)|(\d+X\^\d+)|(\d+\.\d+X)|(\d+X)|((?<!X|\^\d+)X\^\d+)|((?<!X|\^\d+)X)|((?<!X)\d\.\d+)|((?<!X)\d+)))+/g)

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
