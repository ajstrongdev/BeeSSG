const { LineByLine } = require('./reader.js');
const { Command } = require('commander');
let theme = 'default';
let debug = false;

const program = new Command();
program
    .name("BeeSSG")
    .version('0.1.0')
    .description('An extensible static site generator with in-line support for HTML, CSS and JavaScript.');

// Generate command
program.command('generate')
    .description('Generate static site from source files.')
    .option('-d, --debug', 'output extra debugging')
    .action((options) => {
        if (options.debug) {
            debug = true
        }
        console.log("Command called, generating.");
            LineByLine(debug);
        });
    
program.parse(process.argv);