---
title:      "Programming Fundamentals: Basics"
date:       2019-05-31 20:38:15
categories: programming-101
tags:       programming fundamentals 101
toc:        true
toc_sticky: true
toc_label:  "In this lesson"
toc_icon:   "code"
header:
  overlay_image:  "/assets/images/studying.jpg"
  teaser:         "/assets/images/studying.jpg"
  overlay_filter: rgba(161, 99, 30, 0.3)
  caption:        "Photo by [Jefferson Santos](https://unsplash.com/@jefflssantos) on Unsplash"

gallery:
  - url:        /assets/images/2019-06-01-prog-fund-basics/compiler1.png
    image_path: /assets/images/2019-06-01-prog-fund-basics/compiler1.png
    title:      "Compiler Process: Stage 1, translate from source code to machine code."
  - url:        /assets/images/2019-06-01-prog-fund-basics/compiler2.png
    image_path: /assets/images/2019-06-01-prog-fund-basics/compiler2.png
    title:     "Compiler Process: Stage 2, machine code executes, taking user input and converting it to output."
  - url:        /assets/images/2019-06-01-prog-fund-basics/interpreter1.png
    image_path: /assets/images/2019-06-01-prog-fund-basics/interpreter1.png
    title:     "Interpreter Process: Program takes user input and does translation and execution to produce out."
---

In this post we'll go through a few basic concepts that we need to know before starting to write code. After clearing
this out, you'll write your first Go lang program, the classic hello world.

# Basic Concepts

## Code

As programmers we write software but we don't spend the time sending a huge stream of `0s` and `1s` to tell the computer
what we want it to do. That process would be very prone to errors and it would make the instructions completely
unreadable to other humans, not to mention the time it would take to write such code.

For those reasons, among others, we rely on *higher level*[^foot1] languages to produce human readable instructions that
can be easily transformed to some other language that the computer can understand. That original version of the software
written in a human readable language, using one or more programming languages, is what we call **source code**[^sourceCode]
or for short just *code*.

This code will go into a compiler or interpreter to be processed and converted to a lower *level code*, also named
**machine code**, which can be understood by the computer. Once the code passes through the compiler or interpreter, the
result is no longer human readable, but can be executed directly in the computer's CPU[^machineCode].

The machine code is *assembled* in a specific **instruction set** that comprises arithmetic, logic, memory and other
operations that tell the computer what to do exactly[^instructionSet].

## Compilers and Interpreters

To put it in simple words a compiler is a *translator*, that reads source code in a programming language and outputs an
equivalent code in another. Generally speaking the target is a lower level language that can be understood by the
computer[^compiler].

Interpreters are also a type of *translator*, but they work in a different way. While compilers go through all the source
code scanning, processing and translating it in its entirety, an interpreter will do the process statement by
statement[^compVSinter]. That is, it will process the single instruction, check its validity and run it before going to
the next line. The process is explained, in a very simplified fashion, in in the following graphics[^compiler]:

{% include gallery caption="Compiler vs. Interpreter Translation Processes" %}

### Compiled vs. Interpreted

These translators have several responsibilities, one of the more important ones is to check and announce if the source
code has any errors, they do this while translating the source[^compiler]. Both compilers and interpreters do this and.
in general terms. they both accomplish the same grand task: translating and executing a program. However, their inner
workings are very distant.

When first checking out this topic a question comes to mind: which one is better? And the answer is simply, each one is
better at different chores. For example, the machine code produced by a compiler appears to be much faster than the
interpreted counterpart, but the latter will usually be capable of giving more precise error information if something
goes wrong[^compiler].

| Compiler                        | Interpreter           |
|:--------------------------------|:----------------------|
| Better performance of executable| Code executes directly|
| Higher degree of optimization   | Better error reporting|

The important aspect is that you can communicate with the computer with both techniques, you can do the same
operations with both and you will end up with a piece of software that can be run by the computer.

## Your First Programming Language

To start writing code, we must first choose one of the multitude of languages
that exist and learn the correct syntax. For our purposes we are going to start
with Go lang.

### A (very) Brief History of Go

Go is a programming language designed by a team of Googlers[^googler], its syntax is similar to C, but improving greatly
on lots of places where C lacks, e.g.: memory safety, garbage collection and concurrency[^gohistory].

Although this language is compiled and uses static types[^statictypes], it has certain features that can be confused
with dynamic typing (e.g.: type inference on variable declaration), but this is only due to Go's focus on simplicity.
Some of the characteristics that describe Go are[^godesign]:

- Static typing
- Efficiency
- Readability and usability
- High-performance networking
- Native concurrency
- Fast compilation
- Package/dependency management

With all these properties in mind, the creators decided to leave out some features that other languages have.

### Hello World
As it is tradition around here, your first program will be a simple *hello world*. For now accept the words that are
shown here, you can go play with this extract of code in the [Go Playground](https://play.golang.com/p/siN2R7PeSJ5).

The source code:

```go
package main

import (
	"fmt"
)

func main() {
	fmt.Println("Hello world, I'm learning programming fundamentals!")
}
```

And the result will be:

```go
Hello world, I'm learning programming fundamentals!

Program exited.
```

Now go play with this code, make it say hi, bye, a number or your favourite poetry extract.

## Further Reading

**Compilers and Interpreters**. Compiler definition, internal structure and how they work.
Get this book: [Compilers: Principles, Techniques, and Tools](https://en.wikipedia.org/wiki/Compilers%3A_Principles%2C_Techniques%2C_and_Tools)
by *Alfred Aho, Monica Lam, Ravi Sethi, Jeffrey Ullman*.
{: .notice--warning}

**Compilers and Interpreters**. A non academic and simple explanation of what interpreters are.
Wikipedia: [Interpreter (computing)](https://en.wikipedia.org/wiki/Interpreter_(computing)#Applications).
{: .notice--warning}

**Go Lang**. A brief history of the language.
Wikipedia: [Go (programming language)](https://en.wikipedia.org/wiki/Go_(programming_language)).
{: .notice--warning}

**Go Lang**. Very good tutorial of the syntax and all the main features of the language.
[A Tour of Go](https://tour.golang.org/). Do this tutorial if you want to rush through all features the language has to
offer, but I will detail the basics in future posts.
{: .notice--warning}

## Footnotes and References
[^foot1]: The higher the level of the language, the closer it is to natural language. Likewise, the lower the level, the closer to machine language.
[^sourceCode]: The Linux Information Project. Source Code Definition. [URL](http://www.linfo.org/source_code.html). Accessed: 2019-06-01.
[^machineCode]: Wikipedia. Machine Code. [URL](https://en.wikipedia.org/wiki/Machine_code). Accessed: 2019-06-01.
[^instructionSet]: Wikipedia. Instruction set architecture. [URL](https://en.wikipedia.org/wiki/Instruction_set_architecture). Accessed: 2019-06-01.
[^compiler]: Alfred Aho, Monica Lam, Ravi Sethi, Jeffrey Ullman. Compilers: Principles, Techniques, and Tools. Pearson Education, Inc. Second Edition. 2006.
[^compVSinter]: StackOverflow. Compiled vs. Interpreted Languages. [URL](https://stackoverflow.com/a/3265602/2880704). Accessed: 2019-06-03
[^interpreter]: Wikipedia. Interpreter (computing). [URL](https://en.wikipedia.org/wiki/Interpreter_(computing)). Accessed: 2019-06-03
[^googler]: A googler is a person who works at Google 🤷.
[^gohistory]: Wikipedia. Go (programming language). [URL](https://en.wikipedia.org/wiki/Go_(programming_language)). Accessed: 2019-06-03
[^statictypes]: We'll see what static and dynamic types mean in the next post.
[^godesign]: Pike, Rob (April 28, 2010). "Another Go at Language Design". Stanford EE Computer Systems Colloquium. Stanford University. Video available.
