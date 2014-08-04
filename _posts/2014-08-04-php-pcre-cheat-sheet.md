---
layout: post
title: "PHP PCRE Cheat Sheet"
quote: Good old regex...
image: /media/2014-08-04-php-pcre-cheat-sheet/cover.jpg
#video: false
#dark: true
---

As a first thought this post isn't meant to be a super complete explanation of all the characters, quantifiers,
modifiers of the regular expression world, neither it is a tutorial on how to use them.

This is just a cheat sheet of the, in my opinion, most used features of the complex world of regex.

#<center>PHP Regex Cheat Sheet</center>

|Base Chars	|															|Meta Chars	|
|---				|---													|---				|---
|`\w`				|Same as (a-z0-9_)						|`^`				|
|`\W`				|Any non word characters			|`$`				|
|`\s`				|Any whitespace chars					|`[`				|
|`\S`				|Any non whitespace character	|`]`				|
|`\d`				|All digits										|`|`				|
|`\D`				|Non digit chars							|`(`				|
|`.`				|Any character								|`)`				|
|						|															|`\`				|

Finally some functions:

|Functions|
|---|
|[preg_match(pattern, subject[, submatches])](http://php.net/manual/en/function.preg-match.php)|
|[preg\_match_all(pattern, subject[, submatches])](http://php.net/manual/en/function.preg-match-all.php)|
|[preg_replace(pattern, replacement, subject)](http://php.net/manual/en/function.preg-replace.php)|
|[preg\_replace_callback(pattern, callback, subject)](http://php.net/manual/en/function.preg-replace-callback.php)|
|[preg_grep(pattern, array)](http://php.net/manual/en/function.preg-grep.php)|
|[preg_split(pattern, subject)](http://php.net/manual/en/function.preg-split.php)|
