const illegalArgument = `
\x1b[31;1mIllegal argument:\x1b[0m one ore more parameters in the command line are not well formated.

\x1b[1mExpected:\x1b[0m
  - flag     : \x1b[1m--flagName\x1b[0m or \x1b[1m-flagAlias\x1b[0m
  - variable : \x1b[1mvariableName\x1b[0m="\x1b[32;1mvariableValue\x1b[0m"

\x1b[1mExamples:\x1b[0m
  - flag     : \x1b[1m--help\x1b[0m or \x1b[1m-h\x1b[0m
  - variable : \x1b[1mequation\x1b[0m="\x1b[32;1m1 * X^2 + 2 * X^1 = 9 X^0\x1b[0m"

`

const usageMessage = `
\x1b[1mUsage:\x1b[0m
  node app.js [\x1b[1m-cfgnpv\x1b[0m][\x1b[1m-h\x1b[0m] \x1b[1mequation\x1b[0m="<\x1b[32;1mequation\x1b[0m>" [\x1b[1mprecision\x1b[0m="<\x1b[32;1mnumberOfDecimals\x1b[0m>"]

\x1b[1mArguments:
  - Flags:\x1b[0m

    \x1b[1;4mDescription:\x1b[0m

    A comand line flag looks like : --\x1b[1mflagName\x1b[0m or \x1b[1m-flagAlias\x1b[0m. It adds a
    \x1b[1mboolean (flagName or flagAlias)\x1b[0m set to \x1b[33;1mtrue\x1b[0m to the argument object.

    \x1b[1;4mExample:\x1b[0m

    \x1b[1m--help\x1b[0m or \x1b[1m-h\x1b[0m

    \x1b[1;4mSupported options:\x1b[0m

    \x1b[1m--complex\x1b[0m, \x1b[1m-c\x1b[0m:   Adds complex roots for quadratic equations.

    \x1b[1m--fraction\x1b[0m, \x1b[1m-f\x1b[0m:  Displays roots in an precise fraction form.

    \x1b[1m--graph\x1b[0m, \x1b[1m-g\x1b[0m:     Plots the reduced equation on a graph.

    \x1b[1m--help\x1b[0m, \x1b[1m-h\x1b[0m:      Displays this help menu.

    \x1b[1m--natural\x1b[0m, \x1b[1m-n\x1b[0m:   Outputs the reduced equation in a more readable form.

    \x1b[1m--pretty\x1b[0m, \x1b[1m-p\x1b[0m:    Makes program's output a lot more readable.

    \x1b[1m--verbose\x1b[0m, \x1b[1m-v\x1b[0m:   Adds more verbose to the equation solving process.

  \x1b[1m- Variables\x1b[0m

    \x1b[1;4mDescription:\x1b[0m

    A command line variable looks like : \x1b[1mvariableName\x1b[0m="\x1b[32;1mvariableValue\x1b[0m".
    It automatically adds a \x1b[1mstring (variableName)\x1b[0m set to \x1b[32;1mvariableValue\x1b[0m
    to the argument object.

    \x1b[1;4mExample:\x1b[0m

    \x1b[1mequation\x1b[0m="\x1b[32;1m1 * X^2 + 2 * X^1 = 9 X^0\x1b[0m"

    \x1b[1;4mSupported options:\x1b[0m

    \x1b[1mequation\x1b[0m:  The equation to solve. It must follow this scheme :
               \x1b[2mPolynom1 ± ... ± PolynomN = PolynomN+1 ± ... ± PolynomN+M\x1b[0m
               in which each \x1b[1mPolynom\x1b[0m is of form \x1b[2mf * X^p\x1b[0m or \x1b[2mfX^p\x1b[0m where 'f'
               is the factor and 'p' is the power of the given polynom.

    \x1b[1mprecision\x1b[0m: The number of decimals from the roots to display. It is
               set to \x1b[33;1m6\x1b[0m by default and takes priority over the \x1b[1m--fraction\x1b[0m
               flag if both are specified. This option range from \x1b[33;1m0\x1b[0m to \x1b[33;1m12\x1b[0m.
`

const notEquation = `
\x1b[31;1mNot an equation:\x1b[0m the '=' sign was not found in the given equation string.

\x1b[1mExpected:\x1b[0m
  \x1b[32;1mPolynom1 \x1b[33;1m±\x1b[0m ... \x1b[33;1m±\x1b[0m \x1b[32;1mPolynomN \x1b[33;1m=\x1b[0m \x1b[32;1mPolynomN+1 \x1b[33;1m±\x1b[0m ... \x1b[33;1m±\x1b[0m \x1b[32;1mPolynomN+M\x1b[0m

\x1b[1mExample:\x1b[0m
  \x1b[32;1m1 * X^2\x1b[0m \x1b[33;1m-\x1b[0m \x1b[32;1m2 * X^1\x1b[0m \x1b[33;1m=\x1b[0m \x1b[32;1m9 X^0\x1b[0m

`

const forbiddenCharacters = `
\x1b[31;1mForbidden characters:\x1b[0m one ore more forbidden characters were found in equation.

\x1b[1mExpected:\x1b[0m
  Only the following set of characters is allowed : [0123456789.+-=*X^]

\x1b[1mExample:\x1b[0m
  1 * X^2 + 2 * X^1 = 9 * X^0

  `

const badPolynom = `
\x1b[31;1mBad polynom:\x1b[0m one ore more polynoms are not correctly formatted.

\x1b[1mExpected:\x1b[0m
  Each polynom must be of form \x1b[2mf * X^p\x1b[0m or \x1b[2mfX^p\x1b[0m where \x1b[2mf\x1b[0m is the factor
  (integer or a float) and \x1b[2mp\x1b[0m the power (integer only) of the polynom.

\x1b[1mExample:\x1b[0m
  \x1b[2m-2.7 * X^4\x1b[0m or \x1b[2m-2.7X^4\x1b[0m
`

module.exports = { illegalArgument, usageMessage, notEquation, forbiddenCharacters, badPolynom }
