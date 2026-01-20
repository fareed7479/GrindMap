import { getBrowser, closeBrowser } from './config/puppeeteer.js';
import fs from 'fs';

const debug = async () => {
  try {
    console.log('Launching browser...');
    const browser = await getBrowser();
    const page = await browser.newPage();

    // Set UA
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    const username = 'rohanrathod54321';
    const url = `https://www.hackerrank.com/${username}`;
    console.log(`Navigating to ${url}...`);

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait a bit for dynamic content
    await new Promise(r => setTimeout(r, 5000));

    console.log('Extracting HTML...');
    // Get full HTML to analyze structure
    const html = await page.content();
    fs.writeFileSync('hr_profile_dump.html', html);
    console.log('Saved to hr_profile_dump.html');

    // Try to guess selectors and log them
    const badges = await page.evaluate(() => {
      const potentialBadges = [];
      // Look for common badge-like identifying classes or elements with 'badge' in class name
      const allDivs = Array.from(document.querySelectorAll('div'));
      const badgeDivs = allDivs.filter(d => d.className.toString().includes('badge'));

      return badgeDivs.map(d => ({
        class: d.className,
        text: d.innerText.substring(0, 50),
      }));
    });
    console.log('Potential Badge Elements found:', badges);
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await closeBrowser();
    process.exit();
  }
};

debug();
