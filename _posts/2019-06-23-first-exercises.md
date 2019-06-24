---
title:      "Programming Fundamentals: Exercises 1"
date:       2019-06-18 16:10:00
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

	for i := 2; i < num/2; i++ {
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
// asdf
```
{: .spoiler}

### 3 Hello bob
Modify the previous program so that only if the name is `"bob"` the greeting will be printed in the screen.

```go
// asdf
```
{: .spoiler}

### 4 Max number
Create a program that prints the maximum between 2 numbers.

```go
// asdf
```
{: .spoiler}

### 5 Sum of numbers
Make a program that calculates the sum of all the numbers from 1 to 100 (i.e.: `1 + 2 + 3 + 4 + ... + 100`) and prints
the result to the screen.

```go
// asdf
```
{: .spoiler}

### 6 Star rating
Make a program that prints stars(`*`) depending on a variable `numStars` (e.g.: if numStars is 3 print `***`). Note: the
range of stars goes from 0 to 5.

```go
// asdf
```
{: .spoiler}

### 7 Sum of multiples
Write a program that calculate the sum of all the multiples of 5 which are less than or equal to a 100. Then print the
result to the screen.

```go
// asdf
```
{: .spoiler}

### 8 Primes up to n
Write a program that prints the prime numbers up to 1000.

```go
// asdf
```
{: .spoiler}

### 9 Factors of a number
Write a program that prints the factors (numbers that divide exactly) a given integer (e.g.: the factors of 60 are 3, 4, and 5).

```go
// asdf
```
{: .spoiler}

### Bonus
- Take a close look at the previous exercise [Power of a number](/programming-101/first-exercises/#power-of-a-number).
  Think what will happen to the showed algorithm when the base is negative? Another problem arises when the exp is
  negative. Describe these problems and propose a solution.

## Footnotes and References

[^fizzbuzz]: Wikipedia. Fizz buzz. [URL](https://en.wikipedia.org/wiki/Fizz_buzz). Accessed: 2019-06-23
