const { parseEquation } = require('./parse.js')

const reduceEquation = (polynomlist) => {
	let reducedList = []
	let	reducedEquation = ''

	for (const polynom of polynomlist) {
		const found = reducedList.find((element) => element.power === polynom.power)

		if (polynom.side === 'r')
			polynom.sign *= (polynom.factor === 0 ? 1 : -1)
		if (!found)
			reducedList.push({ sign: polynom.sign, factor: polynom.factor, power: polynom.power })
		else {
			found.factor = found.sign * found.factor + polynom.sign * polynom.factor
			found.sign = (found.factor >= 0 ? 1 : -1)
			found.factor = parseFloat(Math.abs(found.factor).toFixed(6))
		}
	}
	reducedList.sort((a, b) => (a.power < b.power ? 1 : -1))

	let firstPolynom = true

	for (const polynom of reducedList) {
		if (firstPolynom && (reducedList.length === 1 || polynom.factor !== 0 || polynom.power === 0)) {
			reducedEquation += (polynom.sign < 0 ? '-' : '')
			reducedEquation += `${polynom.factor} * X^${polynom.power}`
			firstPolynom = false
			continue
		}
		if (polynom.factor !== 0)
			reducedEquation += ` ${polynom.sign < 0 ? '-' : '+'} ${polynom.factor} * X^${polynom.power}`
	}
	reducedEquation += ' = 0'
	console.log(`\n\x1b[1;4mReduced form:\x1b[0m\n\n\t\x1b[33;1m${reducedEquation}\x1b[0m\n`)
	return reducedList
}

const solveSecondDegree = ({ a, b, c }) => {
	const discriminant = (b ** 2) - (4 * a * c)

	if (discriminant > 0) {
		const positiveRoot = parseFloat(Number((-b + discriminant ** 0.5) / (2 * a)).toFixed(6))
		const negativeRoot = parseFloat(Number((-b - discriminant ** 0.5) / (2 * a)).toFixed(6))
		console.log(`\tThe discriminant of this equation is strictly positive (\x1b[1;33m${discriminant}\x1b[0m), so this equation has two roots: \x1b[1;33m${negativeRoot} \x1b[0m and \x1b[1;33m${positiveRoot}\x1b[0m.\n`)
	} else if (discriminant === 0) {
		const zeroRoot = parseFloat(Number(-b / (2 * a)).toFixed(6))
		console.log(`\tThe discriminant of this equation is equal to 0, so this equation has a unique root: \x1b[1;33m${zeroRoot}\x1b[0m.\n`)
	} else {
		console.log(`\tThe discriminant of this equation is strictly negative (\x1b[33;1m${discriminant}\x1b[0m), so there is no real solution.\n`)
	}
}

const solveFirstDegree = ({ b, c }) => {
	console.log(`\tThe solution to this equation is \x1b[1;33m${-c / b}\x1b[0m.\n`)

}

const solveZerothDegree = ({ c }) => {
	if (c === 0)
		console.log('\t\x1b[33;1mℝ\x1b[0m, the set of real number is the solution to this equation.\n')
	else
		console.log('\tThis equation does not have any solution.\n')
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

const solveEquation = ({ equation, verbose }) => {
	const polynomlist = parseEquation({ equation, verbose })
	const reducedList = reduceEquation(polynomlist)
	const degree = getDegree(reducedList)

	console.log(`\x1b[1;4mPolynomial degree:\x1b[0m\n\n\tThis is a polynomial equation of degree \x1b[33;1m${degree}\x1b[0m.`)
	if (degree > 2) {
		console.log('\tUnfortunately, this software cannot solve\n\tpolynomial equations of degree higher than 2.')
		process.exit()
	}

	const foundA = reducedList.filter((element) => {return element.power === 2})[0]
	const foundB = reducedList.filter((element) => {return element.power === 1})[0]
	const foundC = reducedList.filter((element) => {return element.power === 0})[0]
	const a = (foundA ? foundA.factor * foundA.sign : 0)
	const b = (foundB ? foundB.factor * foundB.sign : 0)
	const c = (foundC ? foundC.factor * foundC.sign : 0)

	console.log('\n\x1b[1;4mSolution(s):\x1b[0m\n')
	if (degree === 2)
		solveSecondDegree({ a, b, c })
	else if (degree === 1)
		solveFirstDegree({ b, c })
	else
		solveZerothDegree({ c })
}

const plotEquation = () =>  {
	return undefined
}

module.exports = { solveEquation, plotEquation }
