import { puppeteerPool } from './utils/puppeteerPool.js';

const test = async () => {
  console.log('=== DETAILED PAGE EVALUATE TEST ===');
  let browser, page;
  try {
    browser = await puppeteerPool.getBrowser();
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

    // Test page.evaluate step by step
    console.log('Testing page.evaluate...');

    const badgeCount = await page.evaluate(() => {
      const badges = document.querySelectorAll('.hacker-badge');
      return badges.length;
    });
    console.log(`Badge count: ${badgeCount}`);

    if (badgeCount > 0) {
      const badgeNames = await page.evaluate(() => {
        const badges = document.querySelectorAll('.hacker-badge');
        return Array.from(badges).map(b => b.innerText.slice(0, 50));
      });
      console.log('Badge names:', badgeNames);
    }

    // Test submission history fetch
    console.log('Testing submission history fetch...');
    const historyUrl =
      'https://www.hackerrank.com/rest/hackers/rohanrathod54321/submission_histories';
    const history = await page.evaluate(async url => {
      try {
        const res = await fetch(url);
        return await res.json();
      } catch (e) {
        return { error: e.message };
      }
    }, historyUrl);
    console.log('History keys:', Object.keys(history).length);

    console.log('=== ALL TESTS PASSED ===');
  } catch (e) {
    console.log('=== TEST FAILED ===');
    console.log('Error:', e.message);
    console.log('Stack:', e.stack);
  } finally {
    if (page) await page.close().catch(() => {});
    await puppeteerPool.closeAll();
    process.exit();
  }
};

test();
