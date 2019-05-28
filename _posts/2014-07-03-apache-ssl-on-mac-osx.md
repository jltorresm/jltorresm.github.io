---
title: "Apache SSL on Mac OSX"
date:   2014-07-03 14:05:18 -0500
categories: tutorial
tags: apache ssl macosx macos
toc: true
toc_label: "In this article"
toc_icon: "flask"
header:
  overlay_image: "/assets/images/laptop_folded_black_bg.jpg"
  overlay_filter: rgba(255, 255, 255, 0.3)
  teaser: "/assets/images/laptop_folded_black_bg.jpg"
  caption: "Photo by [Philipp Katzenberger](https://unsplash.com/@fantasyflip) on Unsplash"
---

Recently I ran into a tutorial that explained pretty well how to set up open ssl with a self signed certificate on Mac
OSX 10.7 to test https in your localhost.

Now I tweak it a little bit (just some details) to run it on **Mac OSX 10.9** better known as **Mavericks**.

Of course this set of instructions may or may not need some adjustments to suit your environment.

Without further ado, here it is.

# How to run ssl on your localhost

## 1. Generate the host key
We need to generate a key for the server. Remember do **NOT** enter a pass phrase for this key, when prompted just leave it blank.

{% highlight bash %}
mkdir /private/etc/apache2/ssl
cd /private/etc/apache2/ssl
sudo ssh-keygen -f server.key
{% endhighlight %}


## 2. Create the certificate request file
This file should have some info about your org that will be used in the SSL certificate.
You will be asked some questions, just answer them freely.

{% highlight bash %}
sudo openssl req -new -key server.key -out request.csr
{% endhighlight %}


## 3. SSL Certificate
Now its time to create the self-signed certificate. You do this by executing:

{% highlight bash %}
sudo openssl x509 -req -days 365 -in request.csr -signkey server.key -out server.crt
{% endhighlight %}


## 4. Apache Time!
We now have the certificate and its time to configure *Apache*.
First of all make a backup of your configuration file `/private/etc/apache2/httpd.conf` just in case this goes south.

### 4.1. Enable SSL Module
Go to `/private/etc/apache2/httpd.conf` and verify that SSL module is enabled _(this means that the line loading the module should be uncommented)_ eg.

{% highlight apacheconf %}
LoadModule ssl_module libexec/apache2/mod_ssl.so
#This is a comment so if the line above has the # just remove it
{% endhighlight %}

### 4.2. Include SSL conf file
In the same file as before make sure this line is uncommented too.

{% highlight apacheconf %}
Include /private/etc/apache2/extra/httpd-ssl.conf
{% endhighlight %}

### 4.3. Include your previously created ssl files in the config
Now go to `/private/etc/apache2/extra/httpd-ssl.conf` and change these two lines:

{% highlight apacheconf %}
SSLCertificateFile "/private/etc/apache2/ssl/server.crt"
SSLCertificateKeyFile "/private/etc/apache2/ssl/server.key"
{% endhighlight %}

### 4.4. Comment unnecessary lines
Same file as above. Comment (_add a # at the beginning of the line_) the lines that start with:

- `SSLCACertificatePath`
- `SSLCARevocationPath`


## 5. Configure the virtual host
You are almost ready just need to configure a *vhost* that uses your newly configured SSL.

So make sure your vhosts config file is included in `/private/etc/apache2/httpd.conf`

This line should be uncommented:

{% highlight apacheconf %}
Include /private/etc/apache2/extra/httpd-vhosts.conf
{% endhighlight %}

Then go to `/private/etc/apache2/extra/httpd-vhosts.conf` and add `NameVirtualHost *:443` below the line that says `NameVirtualHost *:80`

Now you can configure a SSL vhost like this:

{% highlight apacheconf %}
<VirtualHost *:443>
    SSLEngine on
    SSLCipherSuite ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP:+eNULL
    SSLCertificateFile /private/etc/apache2/ssl/server.crt
    SSLCertificateKeyFile /private/etc/apache2/ssl/server.key
    ServerName somename
    DocumentRoot "/path/to/some/directory/"
</VirtualHost>
{% endhighlight %}


## 6. Restart Apache
Finally you have to restart Apache and you are all done.

{% highlight apacheconf %}
sudo apachectl restart
{% endhighlight %}

_**Note:** You can check apache configuration before restarting it by executing:_

{% highlight apacheconf %}
sudo apachectl configtest
{% endhighlight %}


Now you can go to `https://somename` and enjoy your site.
