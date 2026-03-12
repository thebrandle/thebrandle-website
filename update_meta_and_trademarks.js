const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let dirty = false;
    let oldContent = content;

    // Meta tags & text replacements for 'Lyniq' -> 'Thebrandle'
    if (content.match(/Lyniq Studio/i) || content.match(/Lyniq/i) || content.match(/YNmypiM868x4WUMKO25HF3tDPN4/)) {
        content = content.replace(/Lyniq Studio/gi, 'Thebrandle');
        content = content.replace(/Lyniq's/gi, "Thebrandle's");
        content = content.replace(/Lyniq/gi, "Thebrandle");
        // Update the og:image and twitter:image
        // They were YNmypiM868x4WUMKO25HF3tDPN4.jpg
        content = content.replace(/YNmypiM868x4WUMKO25HF3tDPN4\.jpg/g, 'abstract_bg.png');
    }

    // Remove Trademark (R) icon everywhere
    // Look for literal ®
    if (content.includes('®')) {
        content = content.replace(/®/g, '');
    }
    // Look for HTML entity names
    if (content.includes('&reg;')) {
        content = content.replace(/&reg;/g, '');
    }
    // Look for HTML entity numbers
    if (content.includes('&#174;')) {
        content = content.replace(/&#174;/g, '');
    }
    
    // Some encoded JS might use unicode escapes like \u00AE
    if (content.includes('\\u00ae') || content.includes('\\u00AE')) {
        content = content.replace(/\\u00ae/gi, '');
    }

    if (content !== oldContent) {
        fs.writeFileSync(filePath, content);
        console.log("Processed:", filePath);
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
