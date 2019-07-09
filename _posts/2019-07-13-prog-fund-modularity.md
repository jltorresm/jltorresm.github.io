---
title:      "Programming Fundamentals: Modularity"
slug:       "modularity"
date:       2019-07-13 00:00:00
categories: programming-101
tags:       programming fundamentals 101 modularity functions packages files scope
toc:        true
toc_sticky: true
toc_label:  "In this lesson"
toc_icon:   "code"
header:
  overlay_image:  "/assets/images/studying.jpg"
  teaser:         "/assets/images/studying.jpg"
  overlay_filter: rgba(161, 99, 30, 0.3)
  caption:        "Photo by [Jefferson Santos](https://unsplash.com/@jefflssantos) on Unsplash"
---

As soon as complexity grows our code becomes larger, in this session we will see how to manage large codebases by
breaking code part in several functions, packages and files.

## Scope of a variable
From our past posts we know what is a variable and its properties. Know we are going to learn a new property of variables
and other programmatic entities, the scope.

_"The scope of a name binding[^nameBinding][...], such as a variable – is the region of a computer program where the binding is valid: where the name can be used to refer to the entity. Such a region is referred to as a scope block."_ [^scope]

It is important to note that out of that scope region the symbolic name could refer to other entities or nothing at all.
To better understand this concept I will show a few examples. These blocks of code will demonstrate the concept of scope
from the point of view of a variable.

```go
package main

import (
	"fmt"
	"math"
)

// This variable has a scope of all the main package
var worksEverywhereInThePackage = "global scope"

func main() {
	var existsOnlyInMain = "function scope"

	fmt.Println(worksEverywhereInThePackage) // The variable still exists here
	fmt.Println(existsOnlyInMain)            // Exists here but not in other functions

	if worksOnlyWithinIf := "local scope"; true {
		fmt.Println(worksOnlyWithinIf)
	}

	// worksOnlyWithinIf --> Can't use this variable here because its out of its scope

	// Pi is a variable defined in another package (the math package).
	// I can use it within the main package because I imported it.
	// and need to specifiy its package to be able to call it.
	fmt.Println(math.Pi)

	otherFunction()

	// existsOnlyInOtherFunction -> Can't use this variable here because its out of its scope
}

func otherFunction() {
	var existsOnlyInOtherFunction = "function scope"

	fmt.Println(worksEverywhereInThePackage) // The variable still exists here
	fmt.Println(existsOnlyInOtherFunction)   // The variable still exists here

	// existsOnlyInMain --> Can't use this variable here because this is not its scope
}
```

## Functions
_Functions are "self contained" modules of code that accomplish a specific task. Functions usually "take in" data,_
_process it, and "return" a result. Once a function is written, it can be used over and over and over again. Functions_
_can be "called" from the inside of other functions._ [^function]

Take a look at this example:

```go
package main

import (
	"fmt"
)

func main() {
	var num1, num2 int = 15, 17
	msg := "The sum of %d and %d is: %d\n"
	fmt.Printf(msg, num1, num2, add(num1, num2))
	fmt.Printf(msg, 4, 5, add(4, 5))
}

func add(a, b int) int {
	return a + b
}

// Result:
// The sum of 15 and 17 is: 32
// The sum of 4 and 5 is: 9
```

Notice the definition of a function called *add* that takes two numbers and returns the sum of those two. Also notice
the *main* function, which is the entry point for Go lang programs. In pseudo-code, these are the parts of a function:

```go
func symbolicName(parameter1 type1, parameter2 type2) returnType1 {
	// All the statements that you want
	// the function to execute
	// go here
}
```

But why do we need to use functions? Well it provides several benefits, to name a few:

- **Re-usability**: A function can be called multiple times. So it allows to reuse code instead of having to re-write it
  multiple times.
- **Organization**: Code gets broken apart in clear _"substeps"_ that allows us to better understand how a problem is
  solved.
- **Readability**: Instead of having to understand hundreds of lines of code at the same time, functions allow us to
  digest the code in smaller, fun-sized modules.
- **Testability**: Functions allow us to better test our code and its sub routines.

If you take a look at past posts you'll see that we have been working in a function all along! The **main** function.
From now on we will divide our code in separate functions when needed to make it more understandable.
{: .notice--success}

### Parameters and return values
By now you have noticed that functions, many times, need to receive some data to process it and after doing all the
magic, the function spits out a result. This information that goes in and out are called parameter/arguments and return
values.

```
               ------------
 parameters--> | function | --> return values
   go in       ------------     come out
```

Go in particular accepts multiple arguments and multiple return values. This means we can define a function with
_zero or more_ parameters and/or _zero or more_ return values.

### Syntax in Go
Here you can see a few function with different number of arguments and returns:

```go
func functionA() {
	// zero parameters,
	// zero return values
}

func functionB(num int) int {
	// One argument (type int)
	// one return value (type int)
	return 15
}

func functionC(num1 int, msg string) (string, bool) {
	// Two parameters (1 int and 1 string)
	// Two return values (1 string and 1 bool)
	return "", true
}
```

Notice a few syntactic rules of Go:

- To declare/define a function you use the reserved word `func`.
- You have to give it a symbolic name (e.g.: `functionA`, `add`, `checkPermission`).
- The parameters that the function receives are defined within parenthesis (`()`) and you have to specify their name and
  type (e.g. in `functionC` the second parameter is called `msg` and has a type `string`).
- The return values of the function have to be defined after the list of parameters. Similarly to parameters, you have
  to specify its type, and optionally its name.
- If you are going to define more than one return value, the list *must* be enclosed in parenthesis(`()`).
- All the defined parameters are available within the body of the function as normal variables, which you can use at will.
- To signal the function which value(s) it has to spit out you use the reserved word `return` (e.g.: in `functionB` we
  `return 15` it can also be a variable or expression).

### The `isPrime` function
To help fix this new information in our heads, we are going to re-work one of the examples of a previous post using a
helper function. We are going to redo the [Prime Number example]({% link _posts/2019-06-23-prog-fund-exercises-1.md %}#prime-number) of the previous post.

{% highlight  go linenos %}
package main

import "fmt"

func main() {
	var num2Check int = 15485863
	var msg = "is NOT prime"

	if isPrime(num2Check) {
		msg = "is prime"
	}

	fmt.Printf("The number %d %s.", num2Check, msg)
}

func isPrime(num int) bool {
	for i := 2; i <= num/2; i++ {
		if num%i == 0 {
			return false
		}
	}
	return true
}
{% endhighlight %}

We separated the part that checks whether a number is prime or not in a separate function. This helps to make the
program more understandable (easier to read) and this way we could reuse the `isPrime` function to check more numbers
without having to re-write the algorithm every time.

Note *line 9*, we are calling the `isPrime` function passing it the number `15485863` which is contained in the variable
`num2Check`. At the same time we are using the return value of the function to evaluate an `if` condition. In this
particular example the `isPrime` function returns a boolean, it takes the value of `true` when the passed number is a
prime ,and `false` when the passed argument is not prime.

## Packages
We can take the concept of separating code in cohesive units even further. Instead of just separating it into function,
we can group several functions and types, that have similar concern/responsibilities, in separate packages.

In a bigger program we could have a package responsible of grouping all things related to communication with the user,
another package containing all operations regarding external services, other package that manages all code related to
business logic, and so forth.

Formally speaking, each programming language has a different definition for a package, and in many cases a different
name altogether. For example, in PHP we use **namespaces** not *packages*. However, from a pragmatic point of view, they
both serve the same purpose: grouping code that has a similar concern or unifying purpose[^cohesion] while separating
other code that doesn't belong.

But why do we need to even care about keeping together code that has the same logic concern and separate it from other
packages of code that have another concern? Well, there are a multitude of benefits that come from a well organized
code[^cohesionAndCoupling], but to mention just a few:

- **reduced complexity**: Code is easier to understand within functions and packages. Because code has a single
  responsibility and is broken in digestible/small blocks, we can easily comprehend what it does.
- **easier to maintain**: The point of separating code into packages is to make them depend less between each other.
  So changes made in one package are likely not going to affect greatly other packages (if well applied to practice).
- **more re-usability**: Functions/packages can be imported into other places an its functionality becomes available to
  other parts of the code without having to repeat code.

### Working with packages in Go
_Every Go program is made up of packages. Programs start running in package main_[^package]. To create new packages you
have to create new folders with new go files in them, easy as that. Take a look at the following directory structure:

```
first-pkg/
├── main.go
└── say
    └── hello.go

1 directory, 2 files
```

The `main.go` file is part of the `main` package and the `hello.go` file has the `io` package. By convention the name of
the package is the last part of the path to the file. So for example if the path to a file is `path/to/the/packaged/file.go`,
then the `file.go` file will have the package `packaged` (which is the name of the folder containing the file).

#### Scope when working with packages
Now lets take a deeper look at each of the files[^download1]:

{% highlight go linenos %}
//
// main.go
//
package main

import (
	"first-pkg/say"
)

func main() {
	say.Hello()
	say.ANumber()
}
{% endhighlight %}

{% highlight go linenos %}
//
// hello.go
//
package say

import (
	"fmt"
	"math/rand"
	"time"
)

func Hello() {
	anything("hello")
}

func ANumber() {
	rand.Seed(time.Now().UnixNano())
	anything(rand.Intn(10))
}

func anything(msg interface{}) {
	fmt.Println(msg)
}
{% endhighlight %}

Now notice lines 11 and 12 in the main.go file. Those lines call functions that don't exist in the `main` package. We
defined those functions in the `say` package (in the _hello.go_ file). But we are **importing** the `say` package in the
_main.go_ file in line 7, so we can call exported functions from the `say` package by prefixing its name with the
package, like so: `say.Hello()`.

If we try to call from the `main` package a function of other package without importing it, it will throw an error.
Likewise, we cannot refer to **unexported** names from other packages. In our example the `anything` function is
unexported, so if we try to call it `say.anything("hey")` the compiler will through an error.

But, **how to distinguish which functions are public/exported and which ones are private/unexported?** In Go it is easy
to know: if a variable, constant, function, etc. has a name that begins with an uppercase letter then that entity is
exported, otherwise, if the name starts with a lowercase letter it will be unexported[^un-exported]. And that is how you
know that the `say.ANumber()` function can be called from outside the package, but the `anything()` function can only be
called from within the package (see _hello.go_ line 13 or 18).

## Go built-in packages
Nevertheless, there are some packages we are importing that we didn't define. If you check carefully the _hello.go_ file
you'll see (in lines 7-9) that we are importing `fmt`, `math/rand` and `time` but we did not define those anywhere.
That's because all those are Go built-in packages.

The designers of the language knew that there are many pieces of code that are used very frequently. So they included,
within the language, an assortment of packages with those utility functions. There are tons of functions to print to
screen, read from the terminal, parse strings, manipulate time, convert numbers among a multitude of others.

The purpose of these collection of built-in packages is to make our lives as programmers easier. Instead of spending
most of our time trying to build functions to do this menial tasks, we get to focus on solving our problems piggybacking
on all these functions that the creators, and maintainers, of the language kindly gave to us.

### Some (very) useful pkgs
Because there are so many packages and functions I cannot mention all of them here, but will include a small list of
a few of the most used ones with link to their documentation, where you can find a comprehensive list of all the
functions these packages provide.

If you want to search for another Go package that is not mentioned here you can go to the
[golang.org](https://golang.org/) website and search for any package by typing its name in the search bar in the top
right corner.

- [builtin](https://golang.org/pkg/builtin/): You don't need to import this package. It is always present in all our programs.
- [fmt](https://golang.org/pkg/fmt/): Implements formatted input/output with functions analogous to C's printf and scanf.
- [strconv](https://golang.org/pkg/strconv): Implements conversions to and from string representations of basic data types.
- [strings](https://golang.org/pkg/strings): Implements simple functions to manipulate strings.
- [math](https://golang.org/pkg/math): Provides basic constants and mathematical functions.
- [sort](https://golang.org/pkg/sort): Provides primitives for sorting slices and user-defined collections[^collections].

## Exercise: Trying out packages
To use all of our acquired knowledge about modularity and to refresh our memories about the past posts. We are going to
implement a program that uses all the tools we have at our disposal.

To solve the following problem you will need to install Go locally in your computer (this will not work on the go
playground online). To do so go to [Golang Downloads](https://golang.org/dl/) and follow the instructions for your
operating system.

You can download [a template here]({% link assets/extras/prog-fund-modularity/packagesProblem.tar.gz %})[^tar] for the
exercise that you can put in your [`$GOPATH/src`](https://github.com/golang/go/wiki/SettingGOPATH) folder and complete
with the code required to make it work as expected.

Our program will do the following:

- It will iterate (loop) from -1 to 100 inclusive.
- For each of those numbers it will apply the following checks:
	- Get reciprocal number.
	- Say if it is even (parity).
	- Say if it is prime.
	- If the number is prime it will further check:
		- If it has a twin prime
		- If it has a cousin prime
	- If it is not prime it will further get:
		- one of its prime factors.
- For each of the checks mentioned above, the program will print a small message saying if the number is or not, has
  or doesn't have the check.

For example, for number 5 the output will be something like:

```
The reciprocal of 5 is 0.200000 because 5.00 * 0.200000 = 1.00
The number 5 is NOT even
The number 5 IS prime
The number 5 has a twin: 7
The number 5 has no cousins
```

Another example, for number 15:

```
The reciprocal of 15 is 0.066667 because 15.00 * 0.066667 = 1.00
The number 15 is NOT even
The number 15 IS NOT prime
The number 15 is divisible by 3
```

Important **NOTE**: We are going to work only with positive integers[^positiveInt]. If the main function receives other
type of integer it should show a message like `We require positive integers to work` and omit that number from the
checks.

After solving the exercise by yourself, you can take a look at my solution, which can be
[downloaded from here]({% link assets/extras/prog-fund-modularity/packagesSolution.tar.gz %}).

## Further Reading

**Functions**. Syntax and short explanation of functions (1).
A Tour of Go: [Packages](https://tour.golang.org/basics/4)
{: .notice--warning}

**Functions**. Syntax and short explanation of functions (2).
A Tour of Go: [Packages](https://tour.golang.org/basics/5)
{: .notice--warning}

**Functions/Return values**. Syntax and short explanation of return values (1).
A Tour of Go: [Packages](https://tour.golang.org/basics/6)
{: .notice--warning}

**Functions/Return values**. Syntax and short explanation of return values (2).
A Tour of Go: [Packages](https://tour.golang.org/basics/7)
{: .notice--warning}

**Packages**. Quick explanation of packages.
A Tour of Go: [Packages](https://tour.golang.org/basics/1)
{: .notice--warning}

**Packages**. Short description of import paths.
A Tour of Go: [Imports](https://tour.golang.org/basics/2)
{: .notice--warning}

**Packages/Scope**. Quick explanation of exported names when working with packages.
A Tour of Go: [Exported names](https://tour.golang.org/basics/3)
{: .notice--warning}

**Cohesion/Coupling**. Cohesion and coupling are two, very important concepts in software engineering.
Taken from Wikipedia: [Cohesion](https://en.wikipedia.org/wiki/Cohesion_(computer_science)).
Taken from StackExchange: [Coupling](https://softwareengineering.stackexchange.com/a/244478/106401).
{: .notice--warning}

## Footnotes and References

[^scope]: Wikipedia. Scope (computer science). [URL](https://en.wikipedia.org/wiki/Scope_(computer_science)). Accessed: 2019-06-28.
[^nameBinding]: Name binding refers to an association of a symbolic name to an entity, such as a variable, function, interface, etc.
[^function]: [H. James de St. Germain](https://www.cs.utah.edu/~germain/). Functions. University of Utah. [URL](https://www.cs.utah.edu/~germain/PPS/Topics/functions.html). Last Updated: Fall 2009. Accessed: 2019-06-28.
[^cohesion]: Wikipedia. Cohesion (computer science). [URL](https://en.wikipedia.org/wiki/Cohesion_(computer_science)). Accessed: 2019-07-03.
[^cohesionAndCoupling]: On a more general note, there are two **software engineering** concepts that are relevant here: cohesion and coupling. For a proper explanation of this two ideas read the [further reading](#further-reading) point titled **Cohesion/Coupling**.
[^package]: A Tour of Go. Packages. [URL](https://tour.golang.org/basics/1). Accessed: 2019-07-05.
[^download1]: You can download the files from [here]({% link assets/extras/prog-fund-modularity/first-pkg.tar.gz %}) to test them locally in your computer. Remember to put the files inside your [`$GOPATH/src`](https://github.com/golang/go/wiki/SettingGOPATH) folder.
[^un-exported]: A Tour of Go. Exported names. [URL](https://tour.golang.org/basics/3). Accessed: 2019-07-05.
[^collections]: We'll see what exactly is a collection and how to work with them in the next post.
[^tar]: The file has a `.tar.gz` extension, this is a **compressed** file much like zip files. To _decompress_ it you need to use the [`tar zxvf fileHere.tar.gz`](https://www.computerhope.com/unix/utar.htm) command, or use a decompressing program that does the magic for you: [windows](https://wiki.haskell.org/How_to_unpack_a_tar_file_in_Windows)
[^positiveInt]: Positive integers are all integer numbers that are greater than or equal to 1. More info [here](https://en.wikipedia.org/wiki/Natural_number).
