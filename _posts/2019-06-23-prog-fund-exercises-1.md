---
title:      "Programming Fundamentals: Exercises 1"
slug:       "exercises-1"
date:       2019-06-23 07:54:09
categories: programming-101
tags:       programming fundamentals 101 exercises conditionals loops for if else
toc:        true
toc_sticky: true
toc_label:  "The exercises"
toc_icon:   "percent"
header:
  overlay_image:  "/assets/images/studying.jpg"
  teaser:         "/assets/images/studying.jpg"
  overlay_filter: rgba(161, 99, 30, 0.3)
  caption:        "Photo by [Jefferson Santos](https://unsplash.com/@jefflssantos) on Unsplash"
---

We'll take a break of the theory an do some exercises. In this sessions you'll use everything you've learned so far to
solve some toy problems.

## Practice exercises

### Worst multiplication algorithm ever
Write a program that multiplies 2 positive integers only using consecutive additions.

```go
package main

import "fmt"

func main() {
	var multiplicand, multiplier, total int = 8, 7, 0

	for i := 0; i < multiplier; i++ {
		total += multiplicand
	}

	fmt.Printf("The result of %d * %d is: %d", multiplicand, multiplier, total)
}
```

**Note**: Think what will happen with this algorithm when the multiplicand and/or multiplier are negative. How would you
solve the problems that arise.

### FizzBuzz
Write a program that counts from `0` to `n`, replacing all numbers divisible by `3` with the word `fizz` and all numbers
divisible by `5` with the word `buzz` and, all the numbers divisible by `3` and `5` with the word `fizbuzz`[^fizzbuzz].

I'll show you 3 alternatives to solve this problem:

```go
// Solution 1
package main

import "fmt"

func main() {
	for i := 1; i <= 100; i++ {
		if i%3 == 0 && i%5 == 0 {
			fmt.Print("fizzbuzz ")
		} else if i%3 == 0 {
			fmt.Print("fizz ")
		} else if i%5 == 0 {
			fmt.Print("buzz ")
		} else {
			fmt.Print(i, " ")
		}
	}
}
```

Next up, the same logic but expressed more clearly with a switch instead of a series of `if...else`:

```go
// Solution 2
package main

import "fmt"

func main() {
	for i := 1; i <= 100; i++ {
		switch true {
		case i%3 == 0 && i%5 == 0:
			fmt.Print("fizzbuzz ")
		case i%3 == 0:
			fmt.Print("fizz ")
		case i%5 == 0:
			fmt.Print("buzz ")
		default:
			fmt.Print(i, " ")
		}
	}
}
```

Finally, here is a solution that simplifies the conditions but needs a support variable:

```go
// Solution 3
package main

import "fmt"

func main() {
	for i := 1; i <= 100; i++ {
		alredayIn := false

		if i%3 == 0 {
			alredayIn = true
			fmt.Print("fizz")
		}

		if i%5 == 0 {
			alredayIn = true
			fmt.Print("buzz")
		}

		if !alredayIn {
			fmt.Print(i)
		}

		fmt.Print(" ")
	}
}
```

Point is, there are countless ways of solving the same problem. Do your best to find the best solution for you.

### Power of a number
Let create a program that calculates the `n`th power of another number, using only consecutive multiplications. For now
we will not worry too much about memory limits. We'll just try small numbers to avoid the computer from exploding.

```go
package main

import "fmt"

func main() {
	var base, exp, total int = 2, 9, 1

	for i := 0; i < exp; i++ {
		total *= base
	}

	fmt.Printf("The result of %d to the power of %d is: %d", base, exp, total)
}
```

### Prime number
Write a program that calculates if a number is *prime*.

```go
package main

import "fmt"

func main() {
	var num int = 655360001
	var isPrime bool = true

	for i := 2; i <= num/2; i++ {
		if num%i == 0 {
			isPrime = false
			break
		}
	}

	if isPrime {
		fmt.Printf("The number %d is prime.", num)
	} else {
		fmt.Printf("The number %d is NOT prime.", num)
	}
}
```

This solution has several optimizations that could be made. But for learning purposes we can leave it at that.


## To do on your own
These is a small list of problems you can use to practice your coding skills, they are arranged in approximately
ascending order depending on difficulty (from easiest to hardest). Good luck!

**Note**: Attempt to solve the problems on your own, **do not** just use the reference solutions. For your own sake do
not cheat when trying to solve the exercises.
{: .notice--warning}

**Note 2**: Remember that the shown answers are just a reference and are **not** the _absolute_ or _best_ answer for every
problem. You can solve each problem in several ways, don't feel like you have to match my code.
{: .notice--warning}


### 1 Hello world
Create a program that prints to the screen the message `"Hello from Go land!"`.

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello from Go land!")
}
```
{: .spoiler}

### 2 Hello name
Create a program that defines a variable `name`, store the name of your best friend in there and print to the screen
   the message `"Hello {name}! I'm coding in Go"` (replace `{name}` with the content of your variable called `name`)

```go
package main

import "fmt"

func main() {
	name := "Alice"
	fmt.Printf("Hello %s", name)
}
```
{: .spoiler}

### 3 Hello bob
Modify the previous program so that only if the name is `"bob"` the greeting will be printed in the screen.

```go
package main

import "fmt"

func main() {
	name := "alice"
	if name == "bob" {
		fmt.Printf("Hello %s", name)
	}
}
```
{: .spoiler}

### 4 Max number
Create a program that prints the maximum between 2 numbers.

```go
package main

import "fmt"

func main() {
	var num1, num2, max = 15, 35, 0

	if num1 > num2 {
		max = num1
	} else {
		max = num2
	}

	fmt.Printf("The max between %d and %d is: %d", num1, num2, max)
}
```
{: .spoiler}

### 5 Sum of numbers
Make a program that calculates the sum of all the numbers from 1 to 100 (i.e.: `1 + 2 + 3 + 4 + ... + 100`) and prints
the result to the screen.

```go
package main

import "fmt"

func main() {
	var from, to, sum int = 1, 100, 0

	for i := from; i <= to; i++ {
		sum += i
	}

	fmt.Printf("The sum from %d to %d is: %d", from, to, sum)
}
```
{: .spoiler}

### 6 Star rating
Make a program that prints stars(`*`) depending on a variable `numStars` (e.g.: if numStars is 3 print `***`). Note: the
range of stars goes from 0 to 5.

Answer 1:

```go
package main

import "fmt"

func main() {
	numStars := 3
	for i := numStars; i > 0; i-- {
		fmt.Print("*")
	}
}
```
{: .spoiler}

Answer 2:

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	numStars := 5
	fmt.Println(strings.Repeat("*", numStars))
}
```
{: .spoiler}

### 7 Sum of multiples
Write a program that calculate the sum of all the multiples of 5 which are less than or equal to a 100. Then print the
result to the screen.

```go
package main

import "fmt"

func main() {
	var check, target, total = 5, 100, 0
	for i := 1; i <= target; i++ {
		if i % check == 0 {
			total += i
		}
	}
	fmt.Printf("The sum of all mutiples of %d up to %d is: %d", check, target, total)
}
```
{: .spoiler}

### 8 Primes up to n
Write a program that prints the prime numbers up to 1000.

```go
package main

import "fmt"

func main() {
	for num := 2; num <= 1000; num++ {
		isPrime := true

		for i := 2; i <= num/2; i++ {
			if num%i == 0 {
				isPrime = false
				break
			}
		}

		if isPrime {
			fmt.Printf("%d ", num)
		}
	}
}
```
{: .spoiler}

### 9 Factors of a number
Write a program that prints the prime factors (prime numbers that divide exactly) a given integer (e.g.: the factors of
60 are 2, 3, and 5).

```go
package main

import "fmt"

func main() {
	num2Check := 30030

	for possibleFactor := 2; possibleFactor <= num2Check/2; possibleFactor++ {
		isPrime := true

		for i := 2; i <= possibleFactor/2; i++ {
			if possibleFactor%i == 0 {
				isPrime = false
				break
			}
		}

		// We check divisibility only if the number is prime
		if isPrime && num2Check%possibleFactor == 0 {
			fmt.Printf("%d ", possibleFactor)
		}
	}
}
```
{: .spoiler}

### Bonus
- Take a close look at the previous exercise [Power of a number](/programming-101/first-exercises/#power-of-a-number).
  Think what will happen to the showed algorithm when the base is negative? Another problem arises when the exp is
  negative. Describe these problems and propose a solution.

## Footnotes and References

[^fizzbuzz]: Wikipedia. Fizz buzz. [URL](https://en.wikipedia.org/wiki/Fizz_buzz). Accessed: 2019-06-23
