---
title: "PHP PCRE Cheat Sheet"
date:   2014-08-04 14:05:18 -0500
categories: tutorial
tags: php pcre regex
---

As a first thought this post isn't meant to be a super complete explanation of all the characters, quantifiers,
modifiers of the regular expression world, neither it is a tutorial on how to use them.

This is just a cheat sheet of the, in my opinion, most used features of the complex world of regex.

# <center>PHP Regex Cheat Sheet</center>

|Base Chars |                             |Meta Chars           |                         |
|:---:      |---                          |:---:                |---                      |
|`\w`       |Same as (a-z0-9_)            |`^`                  |Start of line/string     |
|`\W`       |Any non word characters      |`$`                  |end of line/string       |
|`\s`       |Any whitespace chars         |`[`                  |Start chars class        |
|`\S`       |Any non whitespace character |`]`                  |End char class           |
|`\d`       |All digits                   |<code>&#124;</code>  |Or *(x&#124;y)* x or y   |
|`\D`       |Non digit chars              |`(`                  |Start subpattern         |
|`\b`       |Word boundary                |`)`                  |End subpattern           |
|`\B`       |Not word boundary            |`\`                  |Escape char              |
|`.`        |Any character                |                     |                         |


---

|Quantifiers|                             |Modifiers            |                                                 |
|:---:      |---                          |:---:                |---                                              |
|`*`        |Zero or more                 |`i`                  |Ignore case                                      |
|`+`        |One or more                  |`m`                  |Multiline mode ^ and $ match start/end of line   |
|`?`        |Zero or one                  |`s`                  |.* will include newline char                     |
|`{n}`      |Exactly n                    |`S`                  |Extra analysis of pattern (optimize reuse)       |
|`{n,}`     |At least n                   |`U`                  |Ungreedy                                         |
|`{,m}`     |At most m                    |`u`                  |Treat as UTF-8                                   |
|`{n,m}`    |From n to m                  |                     |*[more about modifiers](http://php.net//manual/en/reference.pcre.pattern.modifiers.php)*|

---

|PHP Functions                                                                                                    |
|---                                                                                                              |
|[preg_match(pattern, subject[, submatches])](http://php.net/manual/en/function.preg-match.php)                   |
|[preg\_match_all(pattern, subject[, submatches])](http://php.net/manual/en/function.preg-match-all.php)          |
|[preg_replace(pattern, replacement, subject)](http://php.net/manual/en/function.preg-replace.php)                |
|[preg\_replace_callback(pattern, callback, subject)](http://php.net/manual/en/function.preg-replace-callback.php)|
|[preg_grep(pattern, array)](http://php.net/manual/en/function.preg-grep.php)                                     |
|[preg_split(pattern, subject)](http://php.net/manual/en/function.preg-split.php)                                 |

<br>
<br>

For a much more detailed documentation visit: [PHP: PCRE Patterns](http://php.net/manual/en/pcre.pattern.php)
