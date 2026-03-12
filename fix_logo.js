const fs = require('fs');

const files = [
    'thebrandle.framer.website/index.html',
    'framerusercontent.com/sites/5kj0S8gDMWYNPEPmYNuaP6/main.html',
    'framerusercontent.com/sites/5kj0S8gDMWYNPEPmYNuaP6/framertoplevel/main.html'
];

const oldBlock = `        /* Footer logo sizing fix */
        .framer-1b5i8re {
            object-fit: contain !important;
            max-width: 100% !important;
            max-height: 100% !important;
        }`;

const newBlock = `        /* Footer logo sizing fix */
        .framer-1b5i8re {
            overflow: visible !important;
            width: 100% !important;
            height: auto !important;
            max-width: 100% !important;
        }
        .framer-1b5i8re .framer-fit-text {
            overflow: visible !important;
        }
        .framer-1b5i8re .framer-text {
            font-size: 110px !important; 
            --framer-font-size: 110px !important;
            line-height: 1 !important;
            white-space: nowrap !important;
        }`;

for (const f of files) {
    if (fs.existsSync(f)) {
        let content = fs.readFileSync(f, 'utf8');
        if (content.includes(oldBlock)) {
            content = content.replace(oldBlock, newBlock);
            fs.writeFileSync(f, content);
            console.log("Updated logo CSS in " + f);
        } else {
            console.log("Could not find old block in " + f);
            // Append if not found?
            if (content.includes('</style>')) {
                 content = content.replace('</style>', newBlock + '\n</style>');
                 fs.writeFileSync(f, content);
                 console.log("Appended new block to " + f);
            }
        }
    }
}
