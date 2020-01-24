---
title:      "Programming Fundamentals: I/O and Collections"
slug:       "io-collections"
date:       2019-07-15 00:00:00
categories: programming-101
tags:       programming fundamentals 101 io i/o terminal files collection arrays maps matrices foreach
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

This post we'll see a few quick ways to read input from users and how to store that information, or any other, in
external files.

## The empty interface
But before digging into the main topic of this post, I want to explain a little bit about the empty interface.

We'll see in more detail what an **interface** is, in the near future. But, for now, lets just say that it is a special
kind of _type_. Remember `int`, `string`, `bool`, etc.? An interface is another type, which can be defined by the
programmer with some special features.

The point right now is to explain that there is a special `interface` in Go called the empty interface. It is
represented as `interface{}` and, for practical purposes, is a special type that can receive any other type. This is how
`fmt.Println()` can receive any variable of any type without complaining. Needless to say, this is very useful to write
code that handles values of unknown types[^emptyInterface].

Now take a look at this example:

```go
package main

import "fmt"

func main() {
	process("hello")
	process(15)
	process(true)
	process(false)
}

func process(value interface{}) {
	var result interface{}

	switch value.(type) {
	case string:
		result = value.(string) + "!"
	case int:
		result = value.(int) + 10
	case bool:
		if value.(bool) {
			result = "value is true"
		} else {
			result = "value is false"
		}
		// You could handle any other types here
	}

	fmt.Println(result)
}

// Result:
//
// hello!
// 25
// value is true
// value is false
//
// Program exited.
```

Notice that the `process()` function is called with integers, strings and booleans in the example, and it accepts all
these different types without complaining. Then we use a **type switch**[^typeSwitch] in the body of the function to
handle different types in different ways.

## Input/Output (I/O)
Input and output refers to the communication of a program with the outside world (or with other program)[^io]. Input is
the information that a user provides, conversely the output is the information that the program sends out.

This interaction can be done in several ways, though we will only check out two of them: via terminal and via files.

### Terminal
When interacting with a user via the terminal[^terminal], everything is done through plain text. There are no fancy
windows or buttons; it's just the user, a plain text window (usually black or other stark color) and the keyboard.

Communication in the terminal is done with text messages, that the user can read, and simple words that the user can
type directly in the terminal window.

Lets take a look at the following example, it is just a simple program that receives two integer numbers and adds them
together, then shows the result to the user:

```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	num1, isValid := getNumFromBuffer(reader)
	if !isValid {
		return
	}

	num2, isValid := getNumFromBuffer(reader)
	if !isValid {
		return
	}

	fmt.Printf("--> %d + %d = %d\n", num1, num2, num1+num2)
}

func getNumFromBuffer(reader *bufio.Reader) (int, bool) {
	fmt.Print("Enter a number: ")
	text, _ := reader.ReadString('\n')

	num, err := strconv.Atoi(strings.TrimSpace(text))
	if err != nil {
		fmt.Println("Invalid character, only integer numbers are accepted.")
		return 0, false
	}

	return num, true
}
```

```go
Enter a number: 7
Enter a number: 34
--> 7 + 34 = 41
```

When you try this example in your local computer you will notice that the first `Enter a number:` message will show up
in the terminal and the program will wait until you enter a number and press enter to continue. After entering two
numbers it will show you the sum of those. But, if you enter an invalid input the program will show you an error message
and halt. I encourage you to try this example with several valid and invalid combinations of inputs so that you get a
feel of how this code works.

Note that in the terminal the input from the user will **always** be a `string`. So in this case, where we need an
integer, we need to convert the input into the correct format before using it in an arithmetic operation.

### Files
- writing and reading to/from files
- few examples

First, our file with the input data:

```
// data.txt
//
// This file should be saved in the same
// directory as the program itself.
//
// Anything that is not an integer number
// will be omitted in the sum.

19.5
1
2
3
this line wont affect the total
5
10
1.0
```

Now the program written in go:

{% highlight go linenos %}
package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"strconv"
	"strings"
)

func main() {
	content := readFile("./data")
	total := sumIntegers(content)
	msg := "The sum of integers is: %d\n"
	fmt.Printf(msg, total)
}

func readFile(path string) string {
	content, err := ioutil.ReadFile("./data.txt")

	// If we encounter an error just show the error
	// to the user and halt the execution of the
	// program completely.
	if err != nil {
		log.Fatal(err)
	}

	return string(content)
}

//
// This function will take the content of the file and
// read it line by line when it finds an integer number
// it will sum it to the total If a value is not an
// integer it will just omit it.
//
func sumIntegers(content string) int {
	var total int

	// We have the content of the file in the
	// content variable this function call
	// splits the content in lines (it is
	// separating the content with the
	// \n -> new line character)
	lines := strings.Split(content, "\n")

	// Now we are iterating over each line
	for _, line := range lines {

		// It tries to convert the
		// current line to an integer
		num, err := strconv.Atoi(string(line))

		// if the conversion fails we assume
		// the value is not an integer and
		// just continue with the next line
		if err != nil {
			continue
		}

		// Sum the current number to the total
		total += num
	}

	return total
}
{% endhighlight %}

## Collections
- What is a collection?
- How is it useful.

### Arrays
- what are arrays
- Examples of different arrays.

### Matrices
- what is a matrix
- examples of matrices

### Maps
- what is a map
- examples of maps.

## Bonus

foreach

## Further Reading

**Functions**. Syntax and short explanation of functions (1).
A Tour of Go: [Packages](https://tour.golang.org/basics/4)
{: .notice--warning}

## Footnotes and References

[^emptyInterface]: A Tour of Go. The empty interface. [URL](https://tour.golang.org/methods/14). Accessed: 2019-07-12.
[^typeSwitch]: Morie information about the type switch can be found [here](https://tour.golang.org/methods/16).
[^io]: Wikipedia. Input/output. [URL](https://en.wikipedia.org/wiki/Input/output). Accessed: 2019-07-16.
[^terminal]: What is a terminal you ask? Take a look at [this article](https://en.wikipedia.org/wiki/Terminal_emulator).
