import { getBrowser } from './config/puppeteer.js';
import fs from 'fs';
import path from 'path';

async function auditScraper(username) {
  console.log(`Auditing scraper for ${username}...`);
  let browser;
  try {
    browser = await getBrowser();
    const page = await browser.newPage();

    // Set a consistent viewport
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    const profileUrl = `https://www.hackerrank.com/profile/${username}`;
    console.log(`Navigating to ${profileUrl}...`);

    // Step 1: Navigation
    const response = await page.goto(profileUrl, { waitUntil: 'networkidle2', timeout: 60000 });
    console.log(`Response Status: ${response.status()}`);

    // Step 2: visual snapshot
    console.log('Taking screenshot...');
    await page.screenshot({ path: path.resolve('audit_screenshot.png') });

    // Step 3: structure snapshot
    const content = await page.content();
    fs.writeFileSync(path.resolve('audit_html.html'), content);
    console.log('HTML dumped to audit_html.html');

    // Step 4: Specific Element Checks
    const title = await page.title();
    console.log(`Page Title: ${title}`);

    const h1 = await page.evaluate(() => document.querySelector('h1')?.innerText);
    console.log(`H1 Text: ${h1}`);

    const badgeCount = await page.evaluate(() => document.querySelectorAll('.hacker-badge').length);
    console.log(`Found .hacker-badge count: ${badgeCount}`);

    const uiBadgeCount = await page.evaluate(() => document.querySelectorAll('.ui-badge').length);
    console.log(`Found .ui-badge count: ${uiBadgeCount}`);

    // Try finding *any* svg or img to see if assets loaded
    const imgCount = await page.evaluate(() => document.querySelectorAll('img').length);
    console.log(`Total img tags: ${imgCount}`);
  } catch (error) {
    console.error('Audit Failed:', error);
  } finally {
    if (browser) await browser.close();
  }
}

auditScraper('rohanrathod54321');
