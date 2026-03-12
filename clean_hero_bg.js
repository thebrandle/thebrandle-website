const fs = require('fs');

const fileHTML = 'thebrandle.framer.website/index.html';
const fileJS = 'framerusercontent.com/sites/5kj0S8gDMWYNPEPmYNuaP6/https/framerusercontent.com/modules/d85zcCTYMfVvf8XGhiGO/zgDKplHMIiq6CdvNDQfP/augiA20Il.js';

const blankImg = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

function cleanFile(file) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // This regex catches the width=2500 part, avoiding the width=645 part which is the valid about image.
        const regex1 = /\/?framerusercontent\.com\/images\/muteeb_pic\.png[^"'\s>]*2500[^"'\s>]*/g;
        
        // We'll also just aggressively catch anything related to muteeb_pic.png that has 2500 or 1500 in the string
        let replaced = content.replace(regex1, blankImg);
        
        fs.writeFileSync(file, replaced);
        console.log(`Cleaned ${file}.`);
    } else {
        console.log(`Not found: ${file}`);
    }
}

cleanFile(fileHTML);
cleanFile(fileJS);

