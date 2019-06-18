---
title:      "Programming Fundamentals: Variables, types and operators"
date:       2019-06-12 13:17:27
categories: programming-101
tags:       programming fundamentals 101 variable type operators
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

Simple view at variables, what they are and how to use them. As a bonus we'll comment about the benefits of having a
good coding style and commenting the code.

## Figuring out variables

Variables are pockets of memory that allow us to *store data*, it has a **data type** and an **address** (to its actual
location in the computer's memory). In a programming language we identify it with a symbolic name that we use to
reference it[^variable].

Their main practical characteristic is that we can assign a value to it, use it later on the program by calling
it by its symbolic name or mutate its value by re-assigning some other value to the variable. On the opposite side of
the spectrum there are [**constants**](#constants), that can be assigned a value when they are declared but said value will never
change during its lifetime.

### Different languages, different variables

When we talk about variables we must note that their nature and behaviour differs slightly depending on what programming
language we are using. We can identify two types of variables based on whether they have a well defined type or
not[^variable] [^typing]:

- **Static**: It has a defined type, which is checked on compile time.
```go
// For example in Go Lang
// I'm explicitly defining a var called name with a type string.
var name string
```

- **Dynamic**: We don't have to explicitly define its type, because it is checked on runtime.
```php
// For example in PHP
// I'm defining a variable called $name but I don't care to specify an explicit
// type I just give it a value and let the interpreter take care of typing it.
$name = "my awesome name";
```

Likewise, we can categorize variables by how we need to specify type conversion when we assign values or use the variable
across the program[^typing]:

- **Strong**: Types have to match when assigning values or passing parameters. Type conversion ([_casting_](#casting)) must be done
explicitly.
```go
// For example in Go Lang
// When assigning the value of count to number I have to change its type
var number float32
var count int
count = 15
number = float32(count)
```

- **Weak**: Type conversion is done implicitly so we don't need to specify it.
```php
// For example in PHP
// The variable's type is changed when needed.
$number = "some number";
$count = 15;
$number = $count;
```

Finally, there is a somewhat in-between (_weakly-strong_?) kind of variable:

- **Duck-typed**: There is no better way to describe this category other than saying:
  _"If it looks like a duck and quacks like a duck, it must be a duck"_[^pythonDuck]. What this means is that we don't
  worry ourselves about checking the formal type of the variable, if it has the correct _methods_ or _attributes_ then
  we treat it as the suitable type[^duck].

### Variables in Go

Returning to our current language of choice (Go), it is a statically typed language. We can define variables in several
ways:

```go
// Option 1: Full length
var num1 int
var num2 int
var num3 int
num1 = 15
num2 = 16
num3 = 17
```

```go
// Option 2: Reduce type declaration
var num1, num2, num3 int
num1 = 15
num2 = 16
num3 = 17
```

```go
// Option 3: Shorthand syntax
num1 := 15
num2 := 16
num3 := 17
```

All three block above are equivalent. They accomplish the task of defining three [_integer_](#a-few-basic-types-in-go)
variables and assign a value to each one of them.

An important thing to keep in mind is that, when a variable is first declared but no explicit value is given, it will
automatically be assigned its _zero value_, ex:

```go
package main

import (
  "fmt"
)

func main() {
  var num int
  fmt.Println("The num is:", num)
}

// The num is: 0
// Program exited.
```

Even though we didn't specifically say that `num` should be equal to `0`, the compiler initialized the var with it
because it is the zero value for integers. Each type has a different zero value which we'll see later on the
[data types](#a-few-basic-types-in-go) section.

That's the gist of it. You define your variable, then you use it. In Go there is one catch: you can't just declare a
variable; if you define a variable and don't use it, it is considered an error:

{% highlight go linenos %}
package main

func main() {
  var num1 int
}

// ./prog.go:4:6: num1 declared and not used
// Go build failed.
{% endhighlight %}

Same here:

{% highlight go linenos %}
package main

func main() {
  var num1 int
  num1 = 15
}

// ./prog.go:4:6: num1 declared and not used
// Go build failed.
{% endhighlight %}

But the following code is successful, because the declared variable is used to print to screen:

```go
package main

import (
  "fmt"
)

func main() {
  var num1 int
  num1 = 13
  fmt.Println("My lucky number is:", num1)
}

// My lucky number is: 13
// Program exited.
```

### Constants

Now that we now what variables are and how they work, we can see the opposite side of variables: **constants**. They are
very much like variables with one big difference, once you assign a value to it, it can't change. So it will live its
live containing one single piece of information. Here comes an example in GO:

```go
package main

import (
  "fmt"
)

func main() {
  // Define the tax constant
  const tax = 0.20
  var lineItem1, lineItem2, lineItem3, total float32

  // Set some line totals
  lineItem1 = 10.5
  lineItem2 = 5.6
  lineItem3 = 17

  // Calculate the total before tax
  total = lineItem1 + lineItem2 + lineItem3
  fmt.Println("Subtotal:", total, "\nTax: ", total * tax, "(", tax * 100, "%)")

  // Apply the tax to the total
  total = total * (1 + tax)
  fmt.Println("Total after tax:", total)
}

//        Subtotal: 33.1
//             Tax:  6.62 ( 20 %)
// Total after tax: 39.72
// Program exited.
```

Notice two things in the code above: first the variable `total` changes value without any problem (it is a variable
after all, it _varies_ over time) and second we are using variables and constants exactly the same. We use them to do
arithmetic operations in the same fashion as if they were variables. But if you try to re-assign a constant the compiler
will trow an error:

{% highlight go linenos %}
package main

func main() {
  // Define the tax constant
  const tax = 0.20

  // Try to increase it
  tax = 0.25
}

// ./prog.go:8:6: cannot assign to tax
// Go build failed.
{% endhighlight %}

## Primitive data types

When we talk about variables we also mention its *type* or *data type*, if this type comes built-in the language itself
we consider it a **primitive**. These basic types are important because they allow us to start using the language
out of the box, but, specially because they serve as building blocks to construct more complex structures that will make
our lives as programmers easier[^primitives].

### A few basic types in GO

Go has its own selection of basic types. The list is long but here we'll include just a few of them which are
particularly useful.

| Type    | Description                                                                                              |
|:-------:|:---------------------------------------------------------------------------------------------------------|
|`bool`   | Expresses logical conditions. Takes the value of `true` or `false`.                                      |
|`string` | Stores strings of characters.                                                                            |
|`int`    | Used for *integer* values. It uses 32 or 64 bits of memory depending on your system's architecture.      |
|`float32`| Stores floating point numbers (numbers with a decimal). It's 32 bits wide as its name suggests[^float64].|

As mentioned before, each type has a **zero value**, which variables take when defined as that type but no value is
assigned explicitly. For each of the primitives mentioned above I'll define their zero value here:

| Type    | Zero Value | Comment                       |
|:-------:|:----------:|:------------------------------|
|`bool`   | `false`    | Logical value of falsehood.   |
|`string` | `""`       | Empty string[^notNullOrSpace].|
|`int`    | `0`        | Zero[^allnumbersAreZero].     |
|`float32`| `0`        | Zero.                         |

### Casting

We know that *static typing* requires us to expressly make type conversion in order to mix variables of different types,
**casting** is the way to do it. Simply put, **casting** is type conversion.

The mechanism to do it is straightforward[^casting]:

> The expression `T(v)` converts the value `v` to the type `T`

A functional example:

```go
package main

import (
  "fmt"
)

func main() {
  var i int
  var f float32
  var bi int64

  i = 13
  f = float32(i)
  bi = int64(f)
  fmt.Println(i, f, bi)

  // 13 13 13
  // Program exited.
}
```

## Operators

Operators combine operands into expressions[^operators]. As their name clearly says they allows us to make operations
(arithmetic, comparison, concatenation, etc.).

### Some basic operators

These are a few **arithmetic operators**[^arithOps]:

| Symbol | What is it? | Which types are allowed                  |
|:------:|:------------|:-----------------------------------------|
| `+`    | sum         | integers, floats, complex alues, strings |
| `-`    | difference  | integers, floats, complex values         |
| `*`    | product     | integers, floats, complex values         |
| `/`    | quotient    | integers, floats, complex values         |
| `%`    | remainder   | integers                                 |

You can see how they are used in the following example:

```go
package main

import (
  "fmt"
)

func main() {
  dividend := 21
  divisor := 4
  result := dividend / divisor
  residue := dividend % divisor
  fmt.Println("The integer division between", dividend, "and", divisor, "results in:", result, "with a residue of:", residue)
}

// The integer division between 21 and 4 results in: 5 with a residue of: 1
// Program exited.
```

Another useful type are the **comparison operators**, which take two values of the same type and yield a boolean[^compOps]:

| Symbol | What is it?      |
|:------:|:-----------------|
| `==`   | equal            |
| `!=`   | not equal        |
| `<`    | less             |
| `<=`   | less or equal    |
| `>`    | greater          |
| `>=`   | greater or equal |

An example:

```go
package main

import (
  "fmt"
)

func main() {
  big := 543
  small := 2
  fmt.Println("Is", small, "greater than", big, "? answer:", small > big)
  fmt.Println("Is", big, "different from", small, "? answer:", big != small)
}

// Is 2 greater than 543 ? answer: false
// Is 543 different from 2 ? answer: true
// Program exited.
```

Note that some operators acquire different semantic depending on the type of variables they are operating against. The
best example is the `+` operator. When applied to numeric values it represents the *addition* operation, but when
applied to strings it acts as the *concatenation* operator, e.g.:

```go
package main

import (
  "fmt"
)

func main() {
  addition := 5 + 8
  concat := "Hello" + " world!"
  fmt.Println("Addition:", addition, "\nConcat:", concat)
}

// Addition: 13
// Concat: Hello world!
// Program exited.
```

Finally, there are a special kind of operators called **unary operators**, which in our context are no more than a
shorthand for a very common type of operation:

| Symbol | Usage   | Equivalence |
|:------:|:-------:|:-----
| `++`   | `num++` | `num = num + 1`
| `--`   | `num--` | `num = num - 1`

### Precedence

Each operator has a precedence (hierarchy) which guides the language, and us, on how complex operations take
place[^precedence].

|        | Precedence | Operator                         |
|:------:|:----------:|:---------------------------------|
| higher |     5      | `*`  `/`  `%`                    |
|        |     4      | `+`  `-`                         |
|        |     3      | `==`  `!=`  `<`  `<=`  `>`  `>=` |
|        |     2      | `&&`[^andOr]                     |
| lower  |     1      | `||`[^andOr]                     |

Taking this precedence into consideration these two operations are equivalent:

```go
a := 5 * 8 + 3 - 7 / 18       // equals 43
b := (5 * 8) + 3 - (7 / 18)   // equals 43

c := 5 * 8 + 3 - 7 / 18 == 43 // true
```

## Bonus: Coding style

When writing code we usually become so focused on solving the problem, that, we don't always think about how we are
putting it down on the paper. This might bite back later when going back to review or maintain that piece of source code.

Think of it as literature. When reading a poorly written novel, it becomes difficult to fully understand it. You might
even stop reading at the middle of the first chapter because it is not enticing. Code is the exact same, good coding
style makes it easy on the eyes, understandable and its purpose apparent.

Checkout this two blocks of code, they accomplish the same task but they have two wildly different coding styles:

```go
package main
import "fmt"
func main() {
var m3,a,b,m2="divisible by",15,7,"is"
if a%b!=0{
m2+=" not"
}
fmt.Println("The number",a,m2,m3,b)
}
```

vs.

```go
package main

import (
  "fmt"
)

func main() {
  var number, divisibleBy int = 15, 7
  var residue int = number % divisibleBy
  var msg string = "is"

  if residue != 0 {
    msg = msg + " not"
  }

  fmt.Println("The number", number, msg, "divisible by", divisibleBy)
}

// The number 15 is not divisible by 7
// Program exited.
```

Which one would you say has a better coding style? The benefits of good style are very clear when you compare these
two blocks.

However, good practices are not limited to **spacing**, **indentation** and **variable naming**. Seasoned programmers
always add **comments** to critical parts of the code, they serve as reminders of the purpose of certain operations or
functions.

```go
package main

import (
  "fmt"
)

//
// This program will calculate if a number is divisible by another.
//
func main() {
  // Define our dividend and its divisor, then calculate the residue
  var number, divisibleBy int = 15, 7
  var residue int = number % divisibleBy
  var msg string = "is"

  // If the residue of the division is not 0 then the number is not divisible
  if residue != 0 {
    msg = msg + " not"
  }

  // Present the result
  fmt.Println("The number", number, msg, "divisible by", divisibleBy)
}
```

But **do not exaggerate**, overdoing it is detrimental:

```go
// main package
package main
//
// Import external packages:
//    - fmt
//
// Note: here will go other packages in the future.
//
import (
  "fmt" // import fmt
)
//
// Main function.
// This program will calculate if a number is divisible by another.
//
func main() {
  // Define the variables that we will use to store the dividend and divisor
  var number, divisibleBy int = 15, 7 // assign them a value of 15 and 7
  // Define the var residue to hold the residue of dividing number and
  // divisibleBy.
  // We are using the modulus(residue) operator to calculate this.
  var residue int = number % divisibleBy // To the modulus operation
  // Define the var where we are going to store the message with the result
  // of the operation to show it to the user
  var msg string = "is" // We set the value to "is" because we are assuming that
  // the value is divisible, but will change the value of this var if needed
  // after checking the result stored in residue.
  //
  // If the residue of the division is not 0 then the number is not divisible
  if residue != 0 {
    // assign the new value of "not" to the message var because the number is
    // not divisible.
    msg = msg + " not"
  }
  // Present the result to the user by concatenating the hard-coded messages
  // and the number (dividend), msg (message with the result of the operations)
  // and the divisibleBy (divisor).
  fmt.Println("The number", number, msg, "divisible by", divisibleBy)
  //
  // Here ends the program
  // Thanks
}
```

So always be mindful of your coding style. As a beginner it will help you construct a more organized mindset for problem
solving. As an experienced programmer it will be a gift to your future self when you have to go back to old code to
change or expand it.

## Further Reading

**Variables**. Syntax for variable declaration (Part 1).
A Tour of Go: [Variables](https://tour.golang.org/basics/8)
{: .notice--warning}

**Variables**. Syntax for variable declaration (Part 2).
A Tour of Go: [Variables with initializers](https://tour.golang.org/basics/9)
{: .notice--warning}

**Variables**. Syntax for variable declaration (Part 3).
A Tour of Go: [Short variable declarations](https://tour.golang.org/basics/10)
{: .notice--warning}

**Constants**. Extensive explanation about constants in Go.
The Go Blog: [Constants](https://blog.golang.org/constants)
{: .notice--warning}

**Constants**. Syntax for constant definition.
A Tour of Go: [Constants](https://tour.golang.org/basics/15)
{: .notice--warning}

**Primitive Types**. Small list of basic types in Go.
A Tour of Go: [Basic types](https://tour.golang.org/basics/11)
{: .notice--warning}

**Operators**. Full specification of operators and punctuation for Go.
The Go Programming Language Specification: [Operators and punctuation](https://golang.org/ref/spec#Operators_and_punctuation)
{: .notice--warning}

**Coding Style**. A rant about good variable naming.
Chris Done's Blog: [German Naming Convention](https://chrisdone.com/posts/german-naming-convention/)
by *Chris Done*.
{: .notice--warning}

## Footnotes and References

[^variable]: Wikipedia. Variable (computer science). [URL](https://en.wikipedia.org/wiki/Variable_(computer_science)). Accessed: 2019-06-08.
[^typing]: Alexis Reigel. "static vs dynamic vs strong vs weak vs duck typing". [URL](https://www.koffeinfrei.org/2012/03/19/static-vs-dynamic-vs-strong-vs-weak-vs-duck-typing/). Accessed: 2019-06-10.
[^duck]: Wikipedia. "Duck typing". [URL](https://en.wikipedia.org/wiki/Duck_typing). Accessed: 2019-06-10.
[^pythonDuck]: Python Documentation. "Glossary". [URL](https://docs.python.org/3/glossary.html#term-duck-typing). Accessed: 2019-06-10.
[^primitives]: Wikipedia. "Primitive data type". [URL](https://en.wikipedia.org/wiki/Primitive_data_type). Accessed: 2019-06-11.
[^float64]: There is also a `float64` type that uses 64 bits in memory. The same applies to `int` (`int8`, `int32`, `int64`...).
[^notNullOrSpace]: The empty string (`""`) is not the same as null (`nil`) or space (`" "`).
[^allnumbersAreZero]: All numeric types including all sizes have a *zero vlaue* of `0`.
[^casting]: Tour of Go. "Type conversions". [URL](https://tour.golang.org/basics/13). Accessed: 2019-06-11.
[^operators]: The Go Programming Language Specification. "Operators". [URL](https://golang.org/ref/spec#Operators). Accessed: 2019-06-11.
[^arithOps]: The Go Programming Language Specification. "Arithmetic operators". [URL](https://golang.org/ref/spec#Arithmetic_operators). Accessed: 2019-06-11.
[^compOps]:  The Go Programming Language Specification. "Comparison operators". [URL](https://golang.org/ref/spec#Comparison_operators). Accessed: 2019-06-11.
[^precedence]: The Go Programming Language Specification. "Operator precedence". [URL](https://golang.org/ref/spec#Operator_precedence). Accessed: 2019-06-11.
[^andOr]: Logic *and* (`&&`) and logic *or* (`||`) are two operators used to concatenate comparison expression and form more complex conditional expressions, we'll see them in more detail on the next post.
