const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Remove R symbol prop in JS: NTNr8ISIZ: "\xae" or similar
    content = content.replace(/NTNr8ISIZ:\s*["']\\xae["']/g, 'NTNr8ISIZ: ""');
    content = content.replace(/NTNr8ISIZ:\s*["']\xae["']/g, 'NTNr8ISIZ: ""');
    content = content.replace(/NTNr8ISIZ:\s*["']®["']/g, 'NTNr8ISIZ: ""');
    
    // Global removal of ®
    content = content.replace(/®/g, '');
    content = content.replace(/&reg;/g, '');
    content = content.replace(/&#174;/g, '');
    content = content.replace(/\\u00ae/gi, '');
    content = content.replace(/\\xae/gi, '');

    // The user wants to hide the R icon container entirely too
    if (filePath.endsWith('.html') && !content.includes('.framer-1xb848l { display: none !important; }')) {
        const css = `
        /* Remove R symbol container */
        .framer-1xb848l { display: none !important; visibility: hidden !important; opacity: 0 !important; }
        `;
        content = content.replace('</style>', css + '\n</style>');
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log("Fixed R symbol in:", filePath);
    }
}

function processDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.mjs')) {
            processFile(fullPath);
        }
    }
}

processDir(__dirname + '/thebrandle.framer.website');
processDir(__dirname + '/framerusercontent.com');
