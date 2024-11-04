let generatedLines = [];

let website = {
    title: 'My Website',
    theme: 'default'
};

let useState = {
    div: 0,
    css: false,
    js: false,
}

let prelude = [
    '<!DOCTYPE html>',
    '<html>',
    '<head>',
    `   <meta name="viewport" content="width=device-width, initial-scale=1.0">`,
    `   <title>${website.title}</title>`,
    `   <link rel="stylesheet" href="style.css">`,
    '</head>',
    '<body>'
];

const postlude = [
    '</body>',
    '</html>'
];

function ProcessLine(line) {
    const commands = {
        'title:': (value) => { website.title == value; },
        'theme:': (value) => { website.theme == value; },
        'PRELUDE': () => { generatedLines.push(...prelude); },
        'POSTLUDE': () => { generatedLines.push(...postlude); },
        'h1:': (value) => { generatedLines.push(`<h1>${value}</h1>`); },
        'h2:': (value) => { generatedLines.push(`<h2>${value}</h2>`); },
        'h3:': (value) => { generatedLines.push(`<h3>${value}</h3>`); },
        'p:': (value) => { generatedLines.push(`<p>${value}</p>`); },
        'img:': (value) => { generatedLines.push(`<img src="${value}"/>`); },
        'a:': (value) => { generatedLines.push(`<a href="https://${value}">${value}</a>`); },
        '//': (value) => { generatedLines.push(`<!-- ${value} -->`); },
        'CONTAINER': () => { generatedLines.push('<div class="container">'); useState.div += 1; },
        'HERO': () => { generatedLines.push('<div class="hero">'); useState.div += 1; },
        'STYLE': () => { generatedLines.push('<style>'); useState.css = true; },
        'SCRIPT': () => { generatedLines.push('<script>'); useState.js = true; },
        'END': () => { 
            if (useState.div > 0) {
                generatedLines.push('</div>');
                useState.div -= 1;
            } else if (useState.css) {
                generatedLines.push('</style>');
                useState.css = false;
            } else if (useState.js) {
                generatedLines.push('</script>');
                useState.js = false;
            }
        },
    };
    let trimmedLine = line.trim();
    for (const [key, action] of Object.entries(commands)) {
        if (trimmedLine.startsWith(key)) {
            action(trimmedLine.substring(key.length).trim());
            return;
        }
    };
    generatedLines.push(line); // Preserve writing in-line HTML, CSS or JS.
}

module.exports = { ProcessLine, generatedLines, website };