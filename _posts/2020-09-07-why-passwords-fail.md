---
title:      "Why Passwords Fail?"
slug:       "why-passwords-fail"
date:       2020-09-07 13:45:00
categories: infosec
tags:       security password second-factor multi-factor authentication
toc:        true
toc_sticky: true
toc_label:  "In this post"
toc_icon:   "user-lock"
excerpt: "Learn why even good passwords can fail, how to protect your
account from breaches, and the security limitations of second factor
authentication."
header:
  overlay_image:  "/assets/images/security.jpg"
  teaser:         "/assets/images/security.jpg"
  overlay_filter: rgba(0, 0, 0, 0.3)
  caption:        "Photo by [Matthew Brodeur](https://unsplash.com/@mrbrodeur) on Unsplash"
---

With so many online services on the rise, most people are overwhelmed with the 
amount of credentials (a.k.a. usernames and passwords) they have to remember.
Most users end up with bad habits around their passwords, which makes them
easier to guess, but even if you have a good password hackers can sometimes
get passwords through phishing or other tactics.

The way to protect yourself from this is by using Second Factor Authentication.

## Why passwords aren't enough?
There are a multitude of reasons why passwords are not good enough, but it all
comes down to the fact that: **what is easy for people to remember, is easy
for computers to guess** and **what is difficult to guess for a computer, is
hard for people to remember**.

So in other words, if you try to come up with easy to remember passwords, and do
that for all your online accounts, you'll end up with passwords that follow
patterns, or are repeated.

Just in 2019 UK's National Cyber Security Centre published a list of the most
hacked passwords amongst other security gaps statistics[^ncsc2019]. Some
worrying findings include:

- **23.3 million** victim [breached] accounts worldwide used `123456` as password.
- **Less than 50%** of people use a strong, separate [not repeated] password for 
 their main email account.

Combine these stats with the fact that stolen passwords are a common trade good
commercialized in the dark web, and the picture becomes more troubling. Take
as an example the recent case of the hacker known as **Sanix** who was selling
around 773 million stolen usernames and passwords before the Ukrainian police
detained him in January 2019[^krebsSanix].

So it becomes clear people need to start using stronger passwords and stop
reusing them across different online services. Yet we come back to the origin
of the problem: it is difficult to come up with hard to guess but memorable
passwords.

The simple solution to this problem, is to use a password manager. It
eliminates the need of remembering passwords and at the same time it generates
for you strong, difficult to guess, combinations that you can use for your
accounts.

However, what happens if the password was stolen somehow? Well, then you can 
protect yourself from hackers accessing your account by activating second
factor authentication on top of your normal password. 

## What is Second Factor Authentication?
Is a type of authentication which uses two independent methods (factors) of
verifying a user identity[^multiFactorCarnegie]. Put simply, you need to provide a password plus an
additional separate component to gain access to your account.

There are several types of authentication factors, to give some examples
[^multiFactorWiki] [^multiFactorCarnegie]:

**Something You Know**<br>_Something only the user knows_
- Password
- Personal Identification Number (PIN)
- Mother's maiden name (Security Questions)

**Something You Have**<br>_Physical object the user has_
- USB stick
- Smartphone
- Token

**Something You Are**<br>_A physical characteristic of the user_
- Voice
- Fingerprint
- Retina

**Somewhere You Are**<br>_A location of the user_
- GPS signal

When performing second factor authentication, the user has to provide 2 of these
factors. A common example is the combination of _Something You Know_ (a password)
and _Something You Have_ (a phone via a secret token).

## The limits of Second Factor Authentication
However, not all authentication factors are created equal. Certain mechanisms
such as SMS or personal security questions are considered less secure than
other options.

Hackers can obtain secret tokens in SMS by cloning SIM cards or by performing 
social engineering attacks. The US' _National Institute of Standards and
Technology_ (NIST) considers the risk of using SMS to be increasing, and
doesn't recommend using it as a second factor[^smsNist].

Secret questions on the other hand, can be easily guessed by attackers that know
some personal information about yourself; things like mother's maiden name, the
street you grew up in, and first car brand aren't exactly secret. Malicious
actors can dig this information from social media or past leaks on other sites
[^wiredSecQues].

Moreover, even if you set up your account with a strong password and use a
good second factor such as time-based one time passwords[^totp] ([Google
Authenticator](https://www.google-authenticator.com/) is one example of 
this type of auth). Attackers might be able to circumvent the second factor 
altogether by using more sophisticated attacks.

A very recent example of this is the Twitter compromise on July 15, 2020
[^krebsTwitterAttack]. Where hackers were able to get administrative
privileges on the twitter platform by targeting "a small number of 
employees through a phone spear phishing attack. This attack relied on a
significant and concerted attempt to mislead certain employees and exploit 
human vulnerabilities to gain access to [Twitter's] internal systems"
[^twitterAnnouncement].

## TL;DR; How to do "passwords" better
- Stop remembering passwords yourself.
- Use a password manager to generate and store passwords (Good alternatives
  are [LastPass](https://www.lastpass.com/) and
  [1Password](https://1password.com/)).
- Wherever possible enable second factor authentication (Check if your
  favourite site offers 2FA in [twofactorauth.org](https://twofactorauth.org)).
- If possible do not use SMS as a second factor, nor secret personal questions.

## Further Reading
**Article**. List of "Most hacked passwords".<br>
By UK's National Cyber Security Centre.
[Go to aticle](https://www.ncsc.gov.uk/news/most-hacked-passwords-revealed-as-uk-cyber-survey-exposes-gaps-in-online-security).
{: .notice--warning}

**Site**. Check if you have an account that has been compromised in a data
breach.<br>
"have i been pwned?".
[Go to site](https://haveibeenpwned.com/).
{: .notice--warning}

**Article**. Detailed explanation about authentication factors, advantages,
disadvantages and other security implications.<br>
"Multi-factor authentication".
[Go to aticle](https://en.wikipedia.org/wiki/Multi-factor_authentication).
{: .notice--warning}

**Data Dump**. Top 100,000 hacked passwords.<br>
By NCSC, taken from Troy Hunt's "Have I Been Pwned" data set.
[Go to list](https://www.ncsc.gov.uk/static-assets/documents/PwnedPasswordsTop100k.txt).
{: .notice--warning}

## Footnotes and References
[^ncsc2019]: Most hacked passwords revealed as UK cyber survey exposes gaps in online security. [URL](https://www.ncsc.gov.uk/news/most-hacked-passwords-revealed-as-uk-cyber-survey-exposes-gaps-in-online-security). Accessed: 2020-09-05.
[^krebsSanix]: Bryan Krebs. Ukraine Nabs Suspect in 773M Password 'Megabreach'. [URL](https://krebsonsecurity.com/2020/05/ukraine-nabs-suspect-in-773m-password-megabreach/). Published: 2019-05-19.
[^multiFactorCarnegie]: Multi-Factor Authentication: What It Is and Why You Need It. [URL](https://www.cmu.edu/iso/news/mfa-article.html). Accessed: 2020-09-07.
[^multiFactorWiki]: Multi-factor authentication. [URL](https://en.wikipedia.org/wiki/Multi-factor_authentication#Authentication_factors). Accessed: 2020-09-07.
[^smsNist]: NIST Special Publication 800-63B. Digital Identity Guidelines. [URL](https://pages.nist.gov/800-63-3/sp800-63b.html). Accessed: 2020-09-07.
[^wiredSecQues]: Lily Hay Newman. Time to Kill Security Questions - or Answer Them With Lies. [URL](https://www.wired.com/2016/09/time-kill-security-questions-answer-lies/). Accessed: 2020-09-07.
[^krebsTwitterAttack]: Bryan Krebs. Three Charged in July 15 Twitter Compromise. [URL](https://krebsonsecurity.com/2020/07/three-charged-in-july-15-twitter-compromise/). Published: 2020-07-31.
[^twitterAnnouncement]: Official Twitter Statement about July 15 compromise. [URL](https://twitter.com/TwitterSupport/status/1289000138300563457). Published: 2020-07-30.
[^totp]: Time-based One-time Password algorithm. [URL](https://en.wikipedia.org/wiki/Time-based_One-time_Password_algorithm). Accessed: 2020-09-07.

















