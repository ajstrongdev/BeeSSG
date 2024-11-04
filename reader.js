const fs = require('fs');
const readline = require('readline');
const { ProcessLine, generatedLines, website } = require('./processor.js');
const { GenerateFile, CopyStylesheet } = require('./generate.js');

async function LineByLine(debugState) {
    const filestream = fs.createReadStream('input/index.beepage');
    const rl = readline.createInterface({
        input: filestream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        ProcessLine(line);
    }
    if (debugState) {
        console.log(generatedLines);
    }
    GenerateFile(generatedLines);
    CopyStylesheet(website.theme);
}

module.exports = { LineByLine };