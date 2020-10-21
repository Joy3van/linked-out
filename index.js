#!/usr/bin/env node

/**
 * Helpful reference: https://developer.mozilla.org/en-US/docs/Web/API/Response/status
 * https://stackoverflow.com/questions/9153571/is-there-a-way-to-get-version-from-package-json-in-nodejs-code
 * https://stackoverflow.com/questions/1335851/what-does-use-strict-do-in-javascript-and-what-is-the-reasoning-behind-it
 */
'use strict'; // Invoke Strict Mode. //Q: What is some best practice to use strict mode? Should I always use it since it secures my code more?
const chalk = require("chalk"); //Coloring the text
const boxen = require("boxen"); //Give the text a box
const yargs = require("yargs"); //Used for displaying commmand-line help file
const fs = require("fs");
const axios = require("axios").default;
const {
    once
} = require('events');
const {
    createReadStream
} = require('fs');
const {
    createInterface
} = require('readline');
const {
    argv,
    version
} = require('./package.json');
const {
    log
} = require("console");
/*According to this post(https://stackoverflow.com/questions/9153571/is-there-a-way-to-get-version-from-package-json-in-nodejs-code) 
                                           this is not a secure way to get the version number as the .json file may expose to client, but I didn't find any better solution, leave for improvement in the future*/
// Globally declared regex for url, credit to Daveo @ https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
var pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gim;
var urlRegex = new RegExp(pattern);

var ignArr = []; //store ignore urls

// Set up CLI flags using yargs

/* GAMEPLAN:
- if -i passed, take the argument that is the ignore file
- then put the urls into an ignArr array
- then compare the gotten urls to see if they match the ignArr array
- ignore if they match
*/


const options = yargs
    .usage('Usage: linkedout <file> or linkedout [OPTION]... - <file> is the path of the file\n' +
        '\nA tiny tool for checking link\'s availiablity')
    .showHelpOnFail(false, 'Specify --help or -h for available options')
    .version('v', `linkedout ${version}`)
    .options({
        'f': {
            alias: 'file',
            describe: 'Check multiple links within a file',
            nrgs: 1
        },
        'v': {
            alias: 'version'
        },
        'h': {
            alias: 'help'
        },
        'a': {
            alias: 'address',
            describe: 'Check if a single link is working',
            type: 'string'
        },
        'i': {
            alias: 'ignore',
            describe: 'Add path to file to ignore all urls in that file (linkedout -f <file> -i <ignore file>)',
            nrgs: 1
        },
    })
    //.showHelp()
    .strictOptions() // Display showHelpOnFail message if a non-exist option is input
    .argv;
//Main part of the program
//TODO: Figure out how to use switch case properly here(or it's not applicable here?)


if (options.ignore) {
    ignoreLinks();
}
if (options.file) {
    linkedInFile(options.file);
} else if (options.address) {
    linkCheck(options.address);
} else if (options._[0]) {
    linkedInFile(options._[0])
} else {
    yargs.showHelp();
}

// function definitions
// 
/**
 * printMsg function
 * @param {string} status
 * @param {string} link
 * Used for printing messages for different scenarios. Using a function makes it
 * easier for future changes(may add different messages for more status codes)
 */
function printMsg(status, link) {
    switch (status) {
        case 'good':
            console.log(chalk.green(link + chalk.bold('\t[GOOD! LINKED address still IN the world!]')));
            break;
        case 'bad':
            console.log(chalk.red(link + chalk.bold("\t[BAD! LINKED address is OUT of this dimension :(]")));
            break;
            //print the same message for other other status and codes that not 200\400\404 temperorily
        default:
            console.log(chalk.grey(link + chalk.bold("\t[UNKNOWN...you LINKED an address to Knowhere?]")));
            break;
    }
}
/**
 * linkCheck function
 * @param {string} link 
 * one thing interesting about this function, when testing this function only, if I test multiple links
 * e.g. Giving: 
 * linkCheck('https://developer.mozilla.org/en-US/docs/Web/API/Location/toString');
 * linkCheck('http://localhost:8080/')
 * linkCheck('https://github.com/joy3van123')
 * "localhost" link's message would always be the first line no matter where it is.
 */

function linkCheck(link) {
    axios.head(link) // only request headers
        .then(response => {
            if (response.status === 200)
                printMsg('good', link);
        })
        .catch(error => {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 404) {
                    printMsg('bad', link);
                }
            } else {
                printMsg(error, link);
            }
        });
}

/**
 * linkedInFile function
 * @param {string} file
 * Check the link you linkedin a file
 * 
 */

function linkedInFile(file) {
    var readable = fs.createReadStream(file); //Requiring less resource than readFile()
    readable.setEncoding('utf8'); //Return string instead of Buffer
    readable.on('data', (chunky) => {

        let urlArr = chunky.match(urlRegex);
        if (options.ignore) { // if ignore is used, we loop through the ignore array and compare that to the array of links, removing links if they match
            urlArr = urlArr.filter(url => !ignArr.includes(url));
        }
        urlArr.forEach(url => {
            linkCheck(url);
        })
    });
    readable.on('error', (err) => {
        console.log(err);
    });
}

/**
 * ignoreLinks function
 * ignore the links within the given file.
 */
async function ignoreLinks() {
    try {
        const rl = createInterface({
            input: createReadStream(options.ignore),
            crlfDelay: Infinity
        });
        rl.on('line', (line) => {
            if (line[0] !== '#') {
                if (line[0] === 'h') {
                    ignArr.push(line);
                } else {
                    rl.close();
                }
            }
        });

        await once(rl, 'close');
    } catch (err) {
        console.log('You probably entered an incorrect sequence of commands');
        console.log('-i USAGE: <command> -f <file to find links in> -i <ignore file>');
    }
}