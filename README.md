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
  
  It adds a boolean (flagName or flagAlias) set to **true** to the argument object.

* Variables
  
  A command line variable looks like :
  
  ```C
  variableName="variableValue"
  ```
  
  It automatically adds a string (variableName) set to variableValue to the argument object.

### Features

WIP
