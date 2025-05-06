const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

(async () => {
    const sitemap = new SitemapStream({ hostname: 'https://gsoc-hub.vercel.app' });

    const writeStream = createWriteStream('./public/sitemap.xml');
    sitemap.pipe(writeStream);

    const pages = [
        { url: '/', priority: 0.8 },
        { url: '/organization', priority: 1 },
    ];

    pages.forEach(page => sitemap.write(page));
    sitemap.end();

    await streamToPromise(sitemap);
    console.log('✅ Sitemap generated!');
})();
