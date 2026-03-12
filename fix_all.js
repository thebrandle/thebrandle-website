const fs = require('fs');
const path = require('path');

const cssToAdd = `
        /* Hide Meet our team */
        .framer-unwsa7 { display: none !important; }
        
        /* Let's bring your vision to life: hide left panel and center right panel */
        .framer-1a4ob2z { display: none !important; }
        .framer-1t0mvh9 {
            margin: 0 auto !important;
            float: none !important;
            display: flex !important;
            justify-content: center !important;
            width: 100% !important;
        }

        /* Footer R symbol */
        .framer-1b5i8re { position: relative !important; }
        .framer-1xb848l {
            position: absolute !important;
            top: 5px !important;
            right: -25px !important;
            margin: 0 !important;
            width: auto !important;
            height: auto !important;
        }
        .framer-1xb848l p {
            font-size: 30px !important;
            --framer-font-size: 30px !important;
            line-height: 1 !important;
        }

        /* Hide 404 */
        a[href*="404"] { display: none !important; }
`;

function processFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let originalList = content.length;
    
    // Add CSS
    if (filePath.endsWith('.html') && !content.includes('.framer-1a4ob2z { display: none !important; }')) {
        content = content.replace('</style>', cssToAdd + '\n</style>');
    }

    // Text Replacements
    content = content.replace(/Annie Bassett/g, 'Muteeb Mehraj');
    content = content.replace(/Project manager and founder/g, 'Founder');
    content = content.replace(/MRuoFuMbnw5FFImDwyAVxU4sYs\.(jpg|png|webp|jpeg)/g, 'muteeb_pic.png');
    // For srcset strings, just obliterate them to avoid them loading
    content = content.replace(/srcSet="[^"]*MRuoFuMbnw5FFImDwyAVxU4sYs[^"]*"/g, 'srcSet=""');
    content = content.replace(/srcset="[^"]*MRuoFuMbnw5FFImDwyAVxU4sYs[^"]*"/g, 'srcset=""');

    if (content.length !== originalList || true) {
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

processDir('./thebrandle.framer.website');
processDir('./framerusercontent.com');

