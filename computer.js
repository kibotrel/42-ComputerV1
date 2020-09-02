const { parseEquation } = require('./parse.js')

const solveEquation = ({ equation, verbose }) => {
	const { degree, leftSide, rightSide } = parseEquation({ equation, verbose })
}

const plotEquation = () =>  {
	return undefined
}

module.exports = { solveEquation, plotEquation }
