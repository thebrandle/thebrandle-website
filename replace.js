const fs = require('fs');

const files = process.argv.slice(2);
for (const fil of files) {
  let content = fs.readFileSync(fil, 'utf8');
  let original = content;

  // Contact Replacements
  content = content.replace(/hello@thebrandlestudio\.com/g, 'hello@thebrandle.com');
  content = content.replace(/\(510\) 895-6500/g, '+971 56 142 9789');
  content = content.replace(/+971561429789/g, '+971561429789');
  
  // Team Replacements
  // Remove "Brandle Team "
  content = content.replace(/Brandle Team/g, 'Brandle Team');
  content = content.replace(//g, '');
  
  content = content.replace(
    /John is here to ensure your experience with us is smooth and successful\. Reach out anytime — he’s here to make sure you feel confident and supported throughout your journey with us\./g,
    'Brandle is here to ensure your experience with us is smooth and successful. Reach out anytime — we are here to make sure you feel confident and supported throughout your journey with us.'
  );
  
  // Update UAE, Dubai locations
  content = content.replace(/123 Creative Lane, Washington, D\.C\., 20001/g, 'UAE, Dubai');
  content = content.replace(/123 Creative Lane, Washington, D\.C\./g, 'UAE, Dubai');

  if (content !== original) {
    fs.writeFileSync(fil, content);
    console.log(`Modified ${fil}`);
  }
}
