self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
    if (event.request.method !== 'GET') return;
    
    let url = new URL(event.request.url);
    
    // Attempt local first if it targets framer domains
    let fetchTarget = event.request;
    if (url.hostname.includes('framer') || url.hostname.includes('framerstatic')) {
        let localUrl = 'http://localhost:8000/' + url.hostname + url.pathname + url.search;
        fetchTarget = localUrl;
    }

    event.respondWith(
        fetch(fetchTarget).then(response => {
            if (!response.ok && fetchTarget !== event.request) {
                // local failed, try remote
                return fetch(event.request).then(res => processResponse(res, url));
            }
            return processResponse(response, url);
        }).catch(() => {
            if (fetchTarget !== event.request) {
                return fetch(event.request).then(res => processResponse(res, url));
            }
            throw new Error('Network error');
        })
    );
});

function processResponse(response, url) {
    const contentType = response.headers.get('content-type') || "";
    const isText = contentType.includes('text') || 
                   contentType.includes('json') || 
                   contentType.includes('javascript') || 
                   url.pathname.endsWith('framercms') || 
                   url.pathname.endsWith('.mjs') || 
                   url.pathname.endsWith('.js');
                   
    if (isText && response.ok) {
        return response.text().then(text => {
            let replaced = text.replace(/Lyniq/g, 'Thebrandle')
                               .replace(/LYNIQ/g, 'THEBRANDLE')
                               .replace(/lyniq/g, 'thebrandle');
            
            const headers = new Headers(response.headers);
            headers.delete('content-length');
            
            return new Response(replaced, {
                status: response.status,
                statusText: response.statusText,
                headers: headers
            });
        }).catch(err => {
            return response;
        });
    }
    return response;
}
