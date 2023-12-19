const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

const url =
    'https://www.dns-shop.ru/catalog/17a8d26216404e77/vstraivaemye-xolodilniki/';
const outputFile = 'products.csv';

async function scrapeDNS() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Enable request interception
    await page.setRequestInterception(true);

    // Intercept requests and block unnecessary ones
    page.on('request', request => {
        if (
            request.resourceType() === 'image' ||
            request.resourceType() === 'stylesheet' ||
            request.resourceType() === 'font'
        ) {
            request.abort();
        } else {
            request.continue();
        }
    });

    // Navigate to the URL
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Get product information using Cheerio
    const content = await page.content();
    const $ = cheerio.load(content);

    const products = [];

    $('.catalog-item').each((index, element) => {
        const name = $(element).find('.product-info__title').text().trim();
        const price = $(element).find('.product-min-price__current').text().trim();

        if (name && price) {
            products.push({ name, price });
        }
    });

    // Save data to CSV file
    const csvData = products
        .map(product => `${product.name},${product.price}`)
        .join('\n');
    fs.writeFileSync(outputFile, 'Name,Price\n' + csvData, 'utf-8');

    console.log(`Data has been successfully scraped and saved to ${outputFile}`);

    // Close the browser
    await browser.close();
}

scrapeDNS();