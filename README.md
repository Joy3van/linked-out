# linked-out

A simple command-line tool helps you finding dead links

## Installation

To use this tool, you need to have Node.js pre-installed in your computer.
[Node.js](https://nodejs.org/en/download/) 

<img src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.ai" width="200" height="100">

After installed Node.js, open terminal. Execute command:
```bash
$ npm install
$ npm link
```

## How to use it

Now with the prerequisites set up. Let's see how to use it!

### Check a single link

When you only want to check a single link, simply type ```linkedout``` in terminal and attach -a/--address followed with a link.(Note: Link should be started with http:// or https://):
```bash
$ linkedout -a https://www.google.ca 
https://www.google.ca   [GOOD! LINKED address still IN the world!]
```
This tool would return the link with a comment suggests if the link is accessible.
If the link can be connected, the text is shown in <span style="color:green">green</span>; If the domain cannot be connected, the text is shown in <span style="color:red">red</span>;
If other reasons casued the connection fail, the text is shown in <span style="color:grey">grey</span>.

### Check a list of links within a file

Alternatively, you can also check multiple links by passing -f/--file to ```linkedout```. For example:
```bash
$ linkedout -f ./test.html
http://s-aleinikov.blog.ca/feed/atom/posts/ [UNKNOWN...you LINKED an address to Knowhere?]
http://rickeyre.ca/open-source-feed.xml [UNKNOWN...you LINKED an address to Knowhere?]
http://tea.cesaroliveira.net/archives/tag/seneca/feed [UNKNOWN...you LINKED an address to Knowhere?]
http://tea.cesaroliveira.net/archives/tag/seneca/feed [UNKNOWN...you LINKED an address to Knowhere?]
https://wiki.cdot.senecacollege.ca/w/api.php?action=rsd [GOOD! LINKED address still IN the world!]
https://wiki.cdot.senecacollege.ca/w/api.php?action=rsd [GOOD! LINKED address still IN the world!]
http://matthewtorrance.com/category/osd/feed/ [UNKNOWN...you LINKED an address to Knowhere?]
http://hesam-chobanlou.com/feed/atom.php [UNKNOWN...you LINKED an address to Knowhere?]
http://hesam-chobanlou.com/feed/atom.php [UNKNOWN...you LINKED an address to Knowhere?]
http://zadkielm.blogspot.com/feeds/posts/default/-/open%20source [BAD! LINKED address is OUT of this dimension :(]
http://zadkielm.blogspot.com/feeds/posts/default/-/open%20source [BAD! LINKED address is OUT of this dimension :(]
https://dps909.defilippis.ca/index.php/feed/ [UNKNOWN...you LINKED an address to Knowhere?]
https://dps909.defilippis.ca/index.php/feed/ [UNKNOWN...you LINKED an address to Knowhere?]
https://jadach1201231188.wordpress.com/feed/    [GOOD! LINKED address still IN the world!]
https://jadach1201231188.wordpress.com/feed/    [GOOD! LINKED address still IN the world!]
http://blog.leapproject.ca/feed/ [UNKNOWN...you LINKED an address to Knowhere?]
http://blog.leapproject.ca/feed/ [UNKNOWN...you LINKED an address to Knowhere?]
```
### More

If you want to know more function about the tool, you can simply execute ```linkedout``` in terminals or passing -h/--help to it:
```bash
$ linkedout --help
Usage: linkedout [OPTION]... URL...

A tiny tool for checking link's availiablity

Options:
  -v, --version                                                        [boolean]
  -f, --file     Check multiple links within a file
  -h, --help     Show help                                             [boolean]
  -a, --address  Check if a single link is working                      [string]
```

---
That's about it! If you have more questions or feedbacks, please contact me [@Joy3van](https://github.com/Joy3van).
Also, feel free to fork it and improve it, it's open-soucrce time! :)

## License

This software is distributed under the [MIT license](https://github.com/Joy3van/linked-out/blob/main/LICENSE).
