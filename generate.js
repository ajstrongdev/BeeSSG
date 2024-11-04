const fs = require('fs');
const Spinner = require('cli-spinner').Spinner;

function GenerateFile(lines) {
    SpinnerHandle('start');
    if (!fs.existsSync('output')) {
        fs.mkdirSync('output');
    } else if (fs.existsSync('output/index.html')) {
        fs.unlinkSync('output/index.html');
    } // If output file exists, delete it so it can be regenerated.
    const file = fs.createWriteStream('output/index.html');
    file.on('error', (err) => { console.log(err); });
    lines.forEach((line) => { file.write(`${line}\n`); });
    file.end();
    SpinnerHandle('stop');
    console.log('\nFile generated successfully!');
}

function CopyStylesheet(theme) {
    fs.copyFileSync(`input/themes/${theme}.css`, 'output/style.css');
    console.log('Stylesheet copied successfully!');
}

let spinner;

function SpinnerHandle(args) {
    if (args === 'start') {
        spinner = new Spinner('Processing... %s');
        spinner.setSpinnerString('|/-\\');
        spinner.start();
    }
    if (args === 'stop') {
        if (spinner) {
            spinner.stop();
        }
    }
}

module.exports = { GenerateFile, CopyStylesheet };