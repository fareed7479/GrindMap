import { scrapeHackerRank } from './services/scraping/hackerrank.scraper.js';
import { puppeteerPool } from './utils/puppeteerPool.js';

const test = async () => {
  try {
    console.log('=== STARTING SCRAPER TEST ===');
    console.log('Testing scraper for rohanrathod54321...');
    const data = await scrapeHackerRank('rohanrathod54321');
    console.log('=== SUCCESS ===');
    console.log('Badges found:', data.data.badges.length);
    console.log('Problems Solved:', data.data.problemsSolved);
    console.log('Full Data:', JSON.stringify(data, null, 2));
  } catch (e) {
    console.log('=== FAILED ===');
    console.log('Error Name:', e.name);
    console.log('Error Message:', e.message);
    console.log('Error Stack:', e.stack);
  } finally {
    await puppeteerPool.closeAll();
    process.exit();
  }
};

test();
