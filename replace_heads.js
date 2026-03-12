const fs = require('fs');

const cssToInject = `
		/* Hide Team member cards and thumbnails */
		.framer-1624jwp, .framer-mh4amm {
			display: none !important;
		}

        /* Abstract Team Background */
        .framer-unwsa7 * {
            /* If there are any img or image containers, we can hide them and apply background here */
            /* Actually, we can just let JS or CSS handle the background image. Let's force an abstract background image. */
        }
        .framer-unwsa7 {
            background-image: url('/framerusercontent.com/images/abstract_bg.png') !important;
            background-size: cover !important;
            background-position: center !important;
        }
        
        /* Footer logo sizing fix */
        .framer-1b5i8re {
            object-fit: contain !important;
            max-width: 100% !important;
            max-height: 100% !important;
        }

	</style>
	<script>
		// Replace Dummy Logos
		document.addEventListener('DOMContentLoaded', () => {
			const realLogos = [
				'https://upload.wikimedia.org/wikipedia/commons/e/e8/Binance_Logo.svg',
				'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg',
				'https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg',
				'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
				'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
			];
			let logoIndex = 0;
            const logoMap = new Map();

			const observer = new MutationObserver(() => {
				const carouselWrappers = document.querySelectorAll('.framer-46623r');
				carouselWrappers.forEach((wrapper) => {
					const img = wrapper.querySelector('img');
					if (img && img.src.includes('logoipsum')) {
                        if (!logoMap.has(img.src)) {
                            logoMap.set(img.src, realLogos[logoIndex % realLogos.length]);
                            logoIndex++;
                        }
						img.src = logoMap.get(img.src);
                        img.srcset = "";
					}
				});
                
                // Remove team background imgs specifically
                const teamSec = document.querySelectorAll('.framer-unwsa7 img');
                teamSec.forEach(img => { img.style.display = 'none'; });
			});

			observer.observe(document.body, { childList: true, subtree: true, attributes: true });
		});
	</script>`;

const files = [
    'thebrandle.framer.website/index.html',
    'framerusercontent.com/sites/5kj0S8gDMWYNPEPmYNuaP6/main.html',
    'framerusercontent.com/sites/5kj0S8gDMWYNPEPmYNuaP6/framertoplevel/main.html'
];

for (const f of files) {
    if (fs.existsSync(f)) {
        let content = fs.readFileSync(f, 'utf8');
        content = content.replace('</style>', cssToInject);
        fs.writeFileSync(f, content);
        console.log("Injected into " + f);
    }
}
