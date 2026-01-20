import { getBrowser } from './config/puppeteer.js';

const test = async () => {
  console.log('=== SIMPLE PUPPETEER TEST ===');
  let browser, page;
  try {
    browser = await getBrowser();
    console.log('Browser launched');

    page = await browser.newPage();
    console.log('Page created');

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0');

    const url = 'https://www.hackerrank.com/profile/rohanrathod54321';
    console.log(`Navigating to: ${url}`);

    const response = await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    console.log(`Response status: ${response.status()}`);

    const title = await page.title();
    console.log(`Page title: ${title}`);

    // Simple DOM check
    const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 500));
    console.log('Body preview:', bodyText.slice(0, 200));

    console.log('=== TEST PASSED ===');
  } catch (e) {
    console.log('=== TEST FAILED ===');
    console.log('Error:', e.message);
    console.log('Stack:', e.stack);
  } finally {
    if (page) await page.close().catch(() => {});
    if (browser) await browser.close().catch(() => {});
    process.exit();
  }
};

test();
