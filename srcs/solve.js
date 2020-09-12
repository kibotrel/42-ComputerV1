const { parseEquation } = require('./parse.js')

const computeFraction = (originalValue) => {
	let value = originalValue
	let roundedValue = Math.floor(value)
	let temporaryNumerator1 = 1
	let temporaryDenominator1 = 0
	let numerator = roundedValue
	let denominator = 1
	const precision = 1.0E-15

	while (value - roundedValue > precision * (denominator * denominator)) {
		const  temporaryNumerator2 = temporaryNumerator1
		const  temporaryDenominator2 = temporaryDenominator1

		value = 1 / (value - roundedValue)
		roundedValue = Math.floor(value)
		temporaryNumerator1 = numerator
		temporaryDenominator1 = denominator
		numerator = temporaryNumerator2 + roundedValue * temporaryNumerator1
		denominator = temporaryDenominator2 + roundedValue * temporaryDenominator1
	}
	return denominator === 1 ? `${numerator}` : `${numerator}/${denominator}`
}

const reduceEquation = ({ polynomlist, args }) => {
	let reducedList = []
	let	reducedEquation = ''
	const naturalFlag = (args.n || args.natural ? true : false)
	const prettyFlag = (args.p || args.pretty ? true : false)

	for (const polynom of polynomlist) {
		const found = reducedList.find((element) => element.power === polynom.power)

		if (polynom.side === 'r')
			polynom.sign *= (polynom.factor === 0 ? 1 : -1)
		if (!found)
			reducedList.push({ sign: polynom.sign, factor: polynom.factor, power: polynom.power })
		else {
			found.factor = found.sign * found.factor + polynom.sign * polynom.factor
			found.sign = (found.factor >= 0 ? 1 : -1)
			found.factor = Math.abs(found.factor)
		}
	}
	reducedList.sort((a, b) => (a.power < b.power ? 1 : -1))

	let firstPolynom = true

	for (const polynom of reducedList) {
		if (firstPolynom && (reducedList.length === 1 || polynom.factor !== 0 || polynom.power === 0)) {
			reducedEquation += (polynom.sign < 0 ? '-' : '')
			if (naturalFlag)
				reducedEquation += `${polynom.factor !== 1 || polynom.power === 0 ? polynom.factor : ''}${polynom.power ? 'X' : ''}${polynom.power > 1 ? `^${polynom.power}` : ''}`
			else
				reducedEquation += `${polynom.factor} * X^${polynom.power}`
			firstPolynom = false
			continue
		}
		if (polynom.factor !== 0) {
			reducedEquation += (polynom.sign < 0 ? ' -' : ' +')
			if (naturalFlag)
				reducedEquation += ` ${polynom.factor !== 1 || polynom.power === 0 ? polynom.factor :  ''}${polynom.power ? 'X' : ''}${polynom.power > 1 ? `^${polynom.power}` : ''}`
			else
				reducedEquation += ` ${polynom.factor} * X^${polynom.power}`
		}
	}
	reducedEquation += ' = 0'
	if (prettyFlag)
		console.log(`\n\x1b[1;4mReduced form:\x1b[0m\n\n\t\x1b[33;1m${reducedEquation}\x1b[0m\n`)
	else
		console.log(`Reduced form: ${reducedEquation}`)
	return reducedList
}

const solveQuadratic = ({ a, b, c, args }) => {
	const complexFlag = (args.c || args.complex ? true : false)
	const prettyFlag = (args.p || args.pretty ? true : false)
	const fractionFlag = (args.f || args.fraction ? true : false)
	const precision = (typeof args.precision !== 'undefined' ? args.precision : 6)
	const discriminant = parseFloat(Number((b ** 2) - (4 * a * c)).toFixed(precision))

	let discriminantPrint = (fractionFlag ? computeFraction(discriminant) : discriminant)
	if (discriminant > 0) {
		let positiveRoot = parseFloat(Number((-b + discriminant ** 0.5) / (2 * a)).toFixed(precision))
		let negativeRoot = parseFloat(Number((-b - discriminant ** 0.5) / (2 * a)).toFixed(precision))

		if (fractionFlag) {
			positiveRoot = computeFraction(positiveRoot)
			negativeRoot = computeFraction(negativeRoot)
		}
		if (prettyFlag)
			console.log(`\tThe discriminant of this equation is strictly positive (\x1b[1;33m${discriminantPrint}\x1b[0m).\n\tSo it has two real roots: \x1b[1;33m${negativeRoot}\x1b[0m and \x1b[1;33m${positiveRoot}\x1b[0m.\n`)
		else
			console.log(`Discriminant is strictly positive, the two solutions are:\n${positiveRoot}\n${negativeRoot}`)
	} else if (discriminant === 0) {
		let zeroRoot = parseFloat(Number(-b / (2 * a)).toFixed(precision))

		if (fractionFlag)
			zeroRoot = computeFraction(zeroRoot)
		if (prettyFlag)
			console.log(`\tThe discriminant of this equation is equal to \x1b[33;1m0\x1b[0m.\n\tSo it has a unique real root: \x1b[1;33m${zeroRoot}\x1b[0m.\n`)
		else
			console.log(`Discriminant is equal to 0, the only solution is:\n${zeroRoot}`)
	} else if (complexFlag) {
		let absoluteDiscriminant = parseFloat(Math.sqrt(Math.abs(discriminant)).toFixed(precision))

		if (fractionFlag)
			absoluteDiscriminant = computeFraction(absoluteDiscriminant)

		const positiveComplexRoot = `(${-b} + ${absoluteDiscriminant} * i) / ${parseFloat(Number(2 * a).toFixed(precision))}`
		const negativeComplexRoot = `(${-b} - ${absoluteDiscriminant} * i) / ${parseFloat(Number(2 * a).toFixed(precision))}`

		if (prettyFlag)
			console.log(`\tThe discriminant of this equation is stricly negative (\x1b[1;33m${discriminantPrint}\x1b[0m).\n\tIt has two complex roots: \x1b[1;33m${positiveComplexRoot}\x1b[0m and \x1b[1;33m${negativeComplexRoot}\x1b[0m.\n`)
		else
			console.log(`Discriminant is strictly negative, the two solutions are:\n${positiveComplexRoot}\n${negativeComplexRoot}`)
	} else {
		if (prettyFlag)
			console.log(`\tThe discriminant of this equation is strictly negative (\x1b[33;1m${discriminant}\x1b[0m).\n\tIt has no real solution.\n`)
		else
			console.log('Discriminant is strictly negative, so there is no real solution.')
	}
}

const solveLinear = ({ b, c, args }) => {
	const prettyFlag = (args.p || args.pretty ? true : false)
	const fractionFlag = (args.f || args.fraction ? true : false)
	const precision = (typeof args.precision !== 'undefined' ? args.precision : 6)
	let root = parseFloat(Number(-c / b).toFixed(precision))

	if (fractionFlag)
		root = computeFraction(root)
	if (prettyFlag)
		console.log(`\tThe solution to this equation is \x1b[1;33m${root}\x1b[0m.\n`)
	else
		console.log(`The solution is:\n${root}`)
}

const solveConstant = ({ c, args }) => {
	const prettyFlag = (args.p || args.pretty ? true : false)

	if (c === 0) {
		if (prettyFlag)
			console.log('\t\x1b[33;1mℝ\x1b[0m, the set of real number is the solution to this equation.\n')
		else
			console.log('The solution is:\nℝ, the set of real number.')
	} else {
		if (prettyFlag)
			console.log('\tThis equation does not have any solution.\n')
		else
			console.log('There is no solution.')
	}
}

const getDegree = (polynomList) => {
	if (polynomList.length === 1) {
		if (polynomList[0].power === 2) {
			if (polynomList[0].factor !== 0) {
				return 2
			} else {
				return 0
			}
		} else
			return polynomList[0].power
	}
	for (polynom of polynomList) {
		if (polynom.factor !== 0)
			return polynom.power
	}
	return polynomList[polynomList.length - 1].power
}

const solveEquation = ({ equation, args }) => {
	const polynomlist = parseEquation({ equation, args })
	const reducedList = reduceEquation({ polynomlist, args })
	const prettyFlag = (args.p || args.pretty ? true : false)
	const degree = getDegree(reducedList)

	if (prettyFlag)
		console.log(`\x1b[1;4mPolynomial degree:\x1b[0m\n\n\tThis is a polynomial equation of degree \x1b[33;1m${degree}\x1b[0m.`)
	else
		console.log(`Polynomial degree: ${degree}`)
	if (degree > 2) {
		if (prettyFlag)
			console.log('\tUnfortunately, this software cannot solve\n\tpolynomial equations of degree higher than 2.\n')
		else
			console.log('The polynomial degree is stricly greater than 2, I can\'t solve.')
	}
	else {
		const foundA = reducedList.filter((element) => {return element.power === 2})[0]
		const foundB = reducedList.filter((element) => {return element.power === 1})[0]
		const foundC = reducedList.filter((element) => {return element.power === 0})[0]
		const a = (foundA ? foundA.factor * foundA.sign : 0)
		const b = (foundB ? foundB.factor * foundB.sign : 0)
		const c = (foundC ? foundC.factor * foundC.sign : 0)

		if (prettyFlag)
			console.log('\n\x1b[1;4mSolution(s):\x1b[0m\n')
		if (degree === 2)
			solveQuadratic({ a, b, c, args })
		else if (degree === 1)
			solveLinear({ b, c, args})
		else
			solveConstant({ c, args })
	}
}

const plotEquation = () =>  {
	return undefined
}

module.exports = { solveEquation, plotEquation }
