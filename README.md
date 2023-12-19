Test task.

Using Node.js and the Puppeteer library (you can connect additional npm packages at your discretion, such as cheerio and others), you need to collect information about all products in the category of the site DNS-shop.ru (https://www.dns-shop.ru/ catalog/17a8d26216404e77/vstraivaemye-xolodilniki/).

At the end, we must save a .csv file to the project directory.

The rows in the file will be the products, and the columns will be the name and price.

An important condition is that when loading pages, you must block requests that do not affect the collected data (images, styles, third-party domains with analytics, etc.).
