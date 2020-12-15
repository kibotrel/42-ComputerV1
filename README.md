# 42-ComputerV1
[![CodeFactor](https://www.codefactor.io/repository/github/kibotrel/42-computerv1/badge)](https://www.codefactor.io/repository/github/kibotrel/42-computerv1) ![GitHub](https://img.shields.io/github/license/kibotrel/42-ComputerV1?color=blue)

This project is a small equation solver. It was made using [plotter](https://www.npmjs.com/package/plotter) to get a nice overview of the equation's shape.


## Install

This program requires you to [install node.js](https://nodejs.org/en/download/) and few packages to get `plotter` to work as intended. On Linux simply use your packet-manager like:

```shell
$> sudo apt-get install gnuplot ghostscript
```

For macOS you must use [Homebrew](https://brew.sh/) to install these packages as follow!

```shell
$> brew install gnuplot ghostscript
```

Once that's done clone the repository and init submodules using:

```shell
$> git clone --recurse-submodules https://github.com/kibotrel/42-ComputerV1
```

Finally, go in `nodejs-plotter` folder and run:

```shell
$> npm install
```

## Usage
### Run the program

Now that everything is installed you only have to use `node` to run the program with at least an equation to solve as argument like :

```shell
$> node computor.js equation="3 * X^1 - 2 * x^0 = 7 * X^2"
```

This command output information about the given equation such as its degree and its root(s) if possible.

### Command line

* Flags:
  
  A comand line flag looks like :
  
  ```shell
  --flagName or -flagAlias
  ```
  
  It adds a boolean (`flagName` or `flagAlias`) set to `true` to the argument object.

* Variables
  
  A command line variable looks like :
  
  ```C
  variableName="variableValue"
  ```
  
  It automatically adds a string (`variableName`) set to `variableValue` to the argument object.

### Features

* Flags:

  Name | Alias | Description
  :---: | :---: | :---:
  `--complex` | `-c` | Computes complex roots of quadratic equations
  `--fraction` | `-f` | Displays every single output as non reductible fraction
  `--graph` | `-g` | Plots the reduced equation on a graph exported as an image
  `--help` | `-h` | Displays a little built-in usage
  `--natural` | `-n` | Outputs values in a more common notation
  `--pretty` | `-p` | Makes program's output a lot more readable
  `--verbose` | `-v` | Adds in-between steps of the solving process to the output

* Variables:

  Name | Description 
  :---: | :---:
  `equation` | The equation to solve. It must follow this particular scheme:<br>`"Polynom1 ± ... ± PolynomN = PolynomN+1 ± ... ± PolynomN+M"`<br>Read more about it bellow.
  `precision` | The number of decimals to display in ouputed values. Set to **6** by default and ranges from **0** to **12** inclusive.

### Equation

As stated above, the **equation** variable must be formated in some way in order for the program to parse it correctly. Each polynom is composed of its factor, X and its power all together noted as `"factor * X^power"` in the equation.

> Example: `"-8.6 * X^2"`

The program handle a lot more than that and allows a more flexible way of inputing data. First, if `power = 1` you can ommit this parameter for this particular polynom.

> Example: `"3 * X^1"` becomes `"3 * X"`

It also understand that everything between a sign and the character `X` is considered as it's `factor` so you can ommit to put the multiply sign.

> Example: `"7.2 * X^3"` becomes `"7.2X^3"`

If by any chance `factor = 1` it can be, once again, ommited because it does not affect the value of the final polynom.

> Example: `"1 * X^2"` becomes `"X^2"`

Likewise if `power = 0` the whole `X^factor` part can be ommited because it results in multiplying `factor` by **1** which does nothing as well.

> Example: `"-5 * X^0"` becomes `"-5"`

Of course, everything can be mixed and the whole remain understandable by the program. Here's a full example.

> Example: `"-6.72 * X + X^3 - 4X^0 - 7X = 9 + 2X^2 - 8.4X + 13"`
