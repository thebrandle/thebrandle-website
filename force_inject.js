const fs = require('fs');

const css = `
        /* Remove Meet our team completely */
        .framer-unwsa7 { display: none !important; }
        
        /* Vision tweaks */
        .framer-1a4ob2z { display: none !important; height: 0 !important; width: 0 !important; overflow: hidden !important; }
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
            top: 0px !important;
            right: 0px !important;
            transform: translateX(100%) !important;
            margin: 0 !important;
            width: auto !important;
            height: auto !important;
        }
        .framer-1xb848l p.framer-text {
            font-size: 25px !important;
            --framer-font-size: 25px !important;
            line-height: 1 !important;
            margin: 0 !important;
        }

        /* Hide 404 */
        a[href*="404"] { display: none !important; opacity: 0 !important; pointer-events: none !important; }
`;

function inject(file) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('transform: translateX(100%)')) {
        content = content.replace('</style>', css + '\n</style>');
        fs.writeFileSync(file, content);
        console.log('Injected CSS into ' + file);
    }
}

inject('thebrandle.framer.website/index.html');
inject('framerusercontent.com/sites/5kj0S8gDMWYNPEPmYNuaP6/framertoplevel/main.html');
inject('framerusercontent.com/sites/5kj0S8gDMWYNPEPmYNuaP6/main.html');
