---
title:      "Programming Fundamentals: Conditionals and Loops"
slug:       "conditionals-loops"
date:       2019-06-18 16:10:00
categories: programming-101
tags:       programming fundamentals 101 conditionals comparison if switch loop iteration while for do-while
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

Now that we know how to work with basic types and a few operators, we are going to check how to represent
_logic conditions_ in the code, and take a look at _loops_ to perform repetitive calculations without having to do them
manually.

## Conditionals

The aim of programming is to solve problems and to solve problems we have to make decisions. Programming languages
provide several ways to control the flow of the program, decide what to do in a situation, in the form of conditional
statement checking.

From the last post we know that there exist a handful of
[logic comparison operators](http://127.0.0.1:4000/programming-101/variables-types-operators/#operators).
These will be our tools to compare variables, constants and other programmable objects and help us decide what to do
next.

### If ... else
Our first flow control tool is the `if` statement. It allows us to execute a particular series of statements only if the
boolean condition is `true`.

The syntax varies a little depending on the language, but the fundamental structure is always the same, in pseudo-code
it goes as follows[^conditionals]:

```
if {boolean_condition} then
	{statements to execute when condition is true}
else
	{alternative statements to execute, when condition is false}
end if
```

In our particular case, Go lang's syntax for `if` statements is:

```go
if condition {
	// instructions
} else {
	// alternative instructions
}
```

Additionally Go has another way of defining an `if` that allows to use a short statement in the place of the condition.
Think of it as a _variable definition_  + _boolean condition_ (2 for the price of 1) situation:

```go
if short_statement; condition {
	// instructions
} else {
	// alternative instructions
}
```

We'll see a few examples to make this concept more understandable:

```go
package main

import "fmt"

func main() {
	yourMountain := 5897 // metres of elevation
	montblanc    := 4808 // metres of elevation

	var result string
	if yourMountain > montblanc {
		result = "higher"
	} else {
		result = "lower"
	}

	fmt.Println("Your mountain is", result, "than Mont Blanc")
}
```

Or with the alternative `short_statement + condition` syntax:

```go
package main

import "fmt"

func main() {
	const montblanc = 4808

	result := "lower"
	if yourMountain := 5897; yourMountain > montblanc {
		result = "higher"
	}

	fmt.Println("Your mountain is", result, "than Mont Blanc")
}
```

Of course sometimes the comparisons we are making require more than one `if` clause. If these multiple conditions are
*mutually exclusive*, then we can chain them in an `if-else-if` statement:

```go
if condition1 {
	// instructions to execute when condition1 is true
} else if condition2 {
	// instructions to execute when condition2 is true, but not condition1
} else if condition3 {
	// instructions to execute when condition3 is true, but not condition1 and condition2
} else {
	// instructions to execute when none of the above conditions are true
}
```

As before this will become easier to grasp when looking at an example:

```go
package main

import "fmt"

func main() {
	today := 5
	msg := "Today is"

	var day string
	if today == 1 {
		day = "monday"
	} else if today == 2 {
		day = "tuesday"
	} else if today == 3 {
		day = "wednesday"
	} else if today == 4 {
		day = "thursday"
	} else if today == 5 {
		day = "friday, yay!"
	} else if today > 5 && today <= 7{
		day = "weekend :)"
	} else {
		day = "not a real day"
	}

	fmt.Println(msg, day)
}
```

Here comes another example using a variety of operators:

```go
package main

import "fmt"

func main() {
	yourNumber := 13

	var description string
	if yourNumber % 2 == 0 {
		description += "Even."
	} else if yourNumber == 13 {
		description += "My lucky number."
	} else if (yourNumber * yourNumber) < 100 {
		description += "Less than a hundred even when squared."
	} else {
		description += "Weird."
	}

	fmt.Println("Your number is:", description)
}
```

So now you get the idea that you can use the `if-else` statement in countless ways.

### Switch
At this point you have noticed that when we have several conditions to check in a row, the `if...else` syntax gets a bit
muddy. That is why most programming languages have another flow control tool, the `switch` statement.

> A switch statement is a shorter way to write a sequence of if - else statements. It runs the first case whose value is equal to the condition expression[^switch].

The syntax is simple:

```go
switch variable {
case value1:
	// this instructions execute only when
	// variable == value1
case value2:
	// only when variable == value2
case value3:
	// only when variable == value3
default:
	// when no other condition matches
}
```

As usual here is a more complete example:

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	var greeting string

	day := time.Now().Weekday()

	switch day {
	case time.Monday:
		greeting = "beginning of week"
	case time.Tuesday:
		greeting = "day for a beer"
	case time.Wednesday:
		greeting = "midweek"
	case time.Thursday:
		greeting = "almost friday"
	case time.Friday:
		greeting = "friday, yay!"
	default:
		greeting = "weekend"
	}

	fmt.Println("Good", greeting)
}
```

Finally, what happens when we want to express a series of conditions that don't necessarily use only the equals
operator(`==`)? We can do it by setting the switch condition to `true` (or not setting it) and evaluating independent
conditions in every `case` statement, like this[^switchNoCond]:

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	t := time.Now()
	switch {
	case t.Hour() < 12:
		fmt.Println("Good morning!")
	case t.Hour() < 17:
		fmt.Println("Good afternoon.")
	default:
		fmt.Println("Good evening.")
	}
}
```

Remember that when a condition matches, the program will execute the block of instruction for that particular _case_ and
it will go out of the switch block altogether, executing no other case in it.

This is a good segue to mention a few differences between _switches_ in go and in other C-based languages. Let's take a
look at this switch statement in PHP:

{% highlight php linenos %}
// This block of code is written in PHP
switch ($thing) {
    case "apple":
        echo "thing is apple";
        break;
    case "bar":
        echo "thing is bar";
        break;
    case "cake":
        echo "thing is cake";
        break;
}
{% endhighlight %}

Now notice in **line #2**, where the condition is defined, while both, PHP and Go, accept variables, function calls, or any
expression that yields a boolean (including `true` itself). In Go, the condition is optional and it can be omitted in
favour of using individual expressions on each `case` statement.

Another obvious difference are the semicolons (`;`) at the end of each instruction. This is a general difference
between the two languages.

Finally, one big and important difference is that Go doesn't need `break` statements (see **lines #5, #8, and #11** of
the example). In other languages including PHP, switch statements need a `break` instruction to indicate that the case
is finished (to break off of the switch). Go behaves like this by default. In opposition, Go has a special instruction
to tell the program to **not** break off and continue executing the next case.

<table>
	<thead>
		<tr>
			<th>php</th>
			<th>go</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
{% highlight php %}
switch ($thing) {
	case "apple":
	case "pineapple":
		echo "thing is a fruit";
		break;
	case "cake":
		echo "thing is cake";
		break;
}
{% endhighlight %}
			</td>
			<td>
{% highlight go %}
switch thing {
case "apple":
	fallthrough
case "pineapple":
	fmt.Print("thing is a fruit")
case "cake":
	fmt.Print("thing is a cake")
}
{% endhighlight %}
			</td>
		</tr>
	</tbody>
</table>

The two switch statements above are equivalent, though they are written in different languages.

## Loops
*"A loop is a sequence of statements which is specified once but which may be carried out several times in succession[...] [The code within the loop] is obeyed a specified number of times, or once for each of a collection of items, or until some condition is met, or indefinitely"* [^loop].

In pseudo-code:
```
loop {condition, or range, or count} {
	// instructions that
	// will be repeated
}
```

### Loops in general
In the more general sense there are 3 common types of loops: `do...while`, `while`, and `for`. They all help us execute
a set of instructions a certain amount of times, but they have subtle differences.

```
// DO...WHILE
do {
	// statements to
	// repeat here
} while {condition}
```

```
// WHILE
while {condition}
	// statements to
	// repeat here
}
```

```
// FOR
for {precondition}; {condition}; {postcondition} {
	// statements to
	// repeat here
}
```

Here are some of the characteristics of each:

| do...while | while | for |
|---|---|---|
| Ensures the execution of the repetition block at least once | The repetition block may run 0 or more times | The repetition block may run 0 or more times  |
| Condition controlled | Condition controlled | Traditionally count controlled |
| Accepts break | Accepts break | Accepts break |
| Accepts continue | Accepts continue | Accepts continue |

### Loops in Go

Go has only **one** loop construct, the `for`[^goFor]. The creators of the language decided to design the _for_ loop
flexible enough so that it could convey all needed loop types with a single type.

#### For
The syntax is similar to what we have already seen in the above definitions:

```go
for i := 0; i < 10; i++ {
	fmt.Println(i)
}
```

In this example, the precondition is a short definition: `i := 0`, the loop condition is a simple comparison: `i < 10`
and the post condition is an increment to the `i` variable: `i++` . The block of instructions that repeat in this case
is the print to screen: `fmt.Println(i)`. The result of the loop will be the numbers from 0 to 9 printed in the screen:

```
0
1
2
3
4
5
6
7
8
9
```

Let's take a look at a more complete example. We'll implement a `for` loop that prints the months of the year:

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	for i := 1; i < 13; i++ {
		fmt.Printf("Month number %d is %s\n", i, time.Month(i).String())
	}
}

// Result:
// Month number 1 is January
// Month number 2 is February
// Month number 3 is March
// Month number 4 is April
// Month number 5 is May
// Month number 6 is June
// Month number 7 is July
// Month number 8 is August
// Month number 9 is September
// Month number 10 is October
// Month number 11 is November
// Month number 12 is December
```

## Bonus

### Truth Table
_"A truth table has one column for each input variable[...], and one final column showing all of the possible results of the logical operation that the table represents"_ [^truthTable].

We'll see a few common logical operations with their truth table. As a beginner, this is a useful reference to know
which operator to use when we are building ifs or loops.

| a | not (`!`) |
|:-:|:---------:|
| 0 | 1         |
| 1 | 0         |

| a | b | equal (`==`) | and (`&&`) |  or (`||`) | xor | nand | nor|
|:-:|:-:|:------------:|:----------:|:----------:|:---:|:----:|:--:|
| 0 | 0 | 1            | 0          | 0          | 0   | 1    | 1  |
| 0 | 1 | 0            | 0          | 1          | 1   | 1    | 0  |
| 1 | 0 | 0            | 0          | 1          | 1   | 1    | 0  |
| 1 | 1 | 1            | 1          | 1          | 0   | 0    | 0  |

### New ways to print to screen
As seen on previous examples, there are more ways to print to screen other than `fmt.Println`. Here I'll show you a
couple more.

First our classic function used in almost all examples:

```go
package main

import "fmt"

func main() {
	name := "alice"
	fmt.Println("Hello ")
	fmt.Println(name)
}

// Hello
// alice

// Program exited.
```

Now **fmt.Print** which is the same as `fmt.Println` but it doesn't print the new line character (`\n`) at the end of the string, e.g.:

```go
package main

import "fmt"

func main() {
	name := "alice"
	fmt.Print("Hello ")
	fmt.Print(name)
}

// Hello alice
// Program exited.
```

Finally, **fmt.Printf** which requires a **format string** and separately the data to print:

```go
package main

import "fmt"

func main() {
	name := "alice"
	fmt.Printf("Hello %s", name)
}

// Hello alice
// Program exited.
```

Notice the weird character `%s` in the `Printf` call. That is a **format verb**, which act kinda like a placeholder
that will be replaced with real data when printed in the screen (notice how the `%s` was replaced by `"alice"` in the
example above).

The placeholder needs to match the type of data that will be replaced in its position, here are some common _verbs_[^formatVerbs]:

| Verb | Description                 |
|------|-----------------------------|
| `%t` | the word true or false      |
| `%d` | base 10 number              |
| `%f` | float number                |
| `%s` | string                      |
| `%p` | address to memory / pointer |
| `%v` | default format (any type)   |

## Further Reading

**Conditionals**. Syntax and short explanation of `if` (1).
A Tour of Go: [If](https://tour.golang.org/flowcontrol/5)
{: .notice--warning}

**Conditionals**. Syntax and short explanation of `if` (2).
A Tour of Go: [If with a short statement](https://tour.golang.org/flowcontrol/6)
{: .notice--warning}

**Conditionals**. Syntax and short explanation of `if` (3).
A Tour of Go: [If and else](https://tour.golang.org/flowcontrol/7)
{: .notice--warning}

**Conditionals**. Syntax and short explanation of `switch` (1).
A Tour of Go: [Switch](https://tour.golang.org/flowcontrol/9)
{: .notice--warning}

**Conditionals**. Syntax and short explanation of `switch` (2).
A Tour of Go: [Switch evaluation order](https://tour.golang.org/flowcontrol/10)
{: .notice--warning}

**Conditionals**. Syntax and short explanation of `switch` (3).
A Tour of Go: [Switch with no condition](https://tour.golang.org/flowcontrol/11)
{: .notice--warning}

**Loops**. Syntax and short explanation of the `for` (1).
A Tour of Go: [For](https://tour.golang.org/flowcontrol/1)
{: .notice--warning}

**Loops**. Syntax and short explanation of the `for` (2).
A Tour of Go: [For continued](https://tour.golang.org/flowcontrol/2)
{: .notice--warning}

**Loops**. Syntax and short explanation of the `for` (3).
A Tour of Go: [For is Go's "while"](https://tour.golang.org/flowcontrol/3)
{: .notice--warning}

**Loops**. Syntax and short explanation of the `for` (4).
A Tour of Go: [Forever](https://tour.golang.org/flowcontrol/4)
{: .notice--warning}

**Loops**. Loops in general, *RECOMMENDED READ*.
Wikipedia: Control flow - [Loops](https://en.wikipedia.org/wiki/Control_flow#Loops)
{: .notice--warning}

**Printing**. Full syntax and spec for the printing functions in Go.
The Go Programming Language: [Package fmt](https://golang.org/pkg/fmt/#hdr-Printing)
{: .notice--warning}

## Footnotes and References

[^conditionals]: Wikipedia. Conditional (computer programming). [URL](https://en.wikipedia.org/wiki/Conditional_(computer_programming)). Accessed: 2019-06-21.
[^switch]: Go Tour. Switch. [URL](https://tour.golang.org/flowcontrol/9). Accessed: 2019-06-21.
[^switchNoCond]: Go Tour. Switch with no condition. [URL](https://tour.golang.org/flowcontrol/11). Accessed: 2019-06-24.
[^loop]: Wikipedia. Control flow. [URL](https://en.wikipedia.org/wiki/Control_flow#Loops). Accessed: 2019-06-24.
[^goFor]:  Go Tour. For. [URL](https://tour.golang.org/flowcontrol/1). Accessed: 2019-06-24.
[^truthTable]: Wikipedia. Truth table. [URL](https://en.wikipedia.org/wiki/Truth_table). Accessed: 2019-06-24.
[^formatVerbs]: The Go Programming Language, Package fmt, [URL](https://golang.org/pkg/fmt/#hdr-Printing). Accessed: 2019-06-24.
