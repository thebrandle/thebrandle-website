const fs = require('fs');

const file = 'framerusercontent.com/sites/5kj0S8gDMWYNPEPmYNuaP6/https/framerusercontent.com/modules/d85zcCTYMfVvf8XGhiGO/zgDKplHMIiq6CdvNDQfP/augiA20Il.js';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the specific image near the text
    // The image src to replace: RuuVHScXn21DshuJ5CzY9yFPrU
    content = content.replace(/RuuVHScXn21DshuJ5CzY9yFPrU\.(jpg|png|webp|jpeg)/g, 'muteeb_bw.png');
    // Clear srcset to prevent loading original
    content = content.replace(/srcSet:\s*"(?:[^"]*muteeb_bw[^"]*)"/g, 'srcSet: ""');
    // For other occurrences or variations
    content = content.replace(/srcset:\s*"(?:[^"]*muteeb_bw[^"]*)"/g, 'srcset: ""');

    fs.writeFileSync(file, content);
    console.log('Successfully replaced the black and white picture with Muteeb picture.');
} else {
    console.error('File not found: ' + file);
}
