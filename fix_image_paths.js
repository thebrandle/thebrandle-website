const fs = require('fs');
const path = require('path');

const customImages = [
    'muteeb_pic.png',
    'muteeb_bw.png',
    'preview_logo.png',
    'abstract_bg.png'
];

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    customImages.forEach(img => {
        // Replace full URL with relative URL for custom images
        const regex = new RegExp('https://framerusercontent\\.com/images/' + img, 'g');
        content = content.replace(regex, '/framerusercontent.com/images/' + img);
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log("Fixed image paths in:", filePath);
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
