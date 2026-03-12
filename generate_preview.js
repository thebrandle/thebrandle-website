const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@800&display=swap');
          body {
            margin: 0;
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            width: 100vw;
          }
          .logo {
            font-family: 'Inter', sans-serif;
            font-size: 160px;
            font-weight: 800;
            color: #000000;
            letter-spacing: -0.05em;
          }
        </style>
      </head>
      <body>
        <div class="logo">THEBRANDLE</div>
      </body>
    </html>
  `);
  
  // Wait for font to load
  await page.evaluateHandle('document.fonts.ready');
  
  // Ensure the images dir exists
  const fs = require('fs');
  if (!fs.existsSync('framerusercontent.com/images')) {
      fs.mkdirSync('framerusercontent.com/images', { recursive: true });
  }

  await page.screenshot({ path: 'public_assets/preview_logo.png' });
  await page.screenshot({ path: 'framerusercontent.com/images/preview_logo.png' });
  await browser.close();
  console.log('Preview image generated');
})();
