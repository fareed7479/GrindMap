// Test to show exact scraper output structure
import { scrapeHackerRank } from './services/scraping/hackerrank.scraper.js';
import { normalizeHackerRank } from './services/normalization/hackerrank.normalizer.js';
import { puppeteerPool } from './utils/puppeteerPool.js';

const test = async () => {
  console.log('=== SCRAPER OUTPUT STRUCTURE TEST ===');

  try {
    console.log('Step 1: Calling scrapeHackerRank...');
    const rawData = await scrapeHackerRank('rohanrathod54321');

    console.log('\nStep 2: Raw scraper output:');
    console.log('Keys:', Object.keys(rawData));
    console.log('rawData.data keys:', Object.keys(rawData.data || {}));
    console.log('rawData.data.badges:', rawData.data?.badges?.length || 'undefined');
    console.log('rawData.data.problemsSolved:', rawData.data?.problemsSolved);

    console.log('\nStep 3: Normalizing...');
    const username = 'rohanrathod54321';
    const normalizeInput = { ...rawData, username };
    console.log('Normalizer input keys:', Object.keys(normalizeInput));

    const normalized = normalizeHackerRank(normalizeInput);
    console.log('\nStep 4: Normalized output:');
    console.log('Keys:', Object.keys(normalized));
    console.log('totalSolved:', normalized.totalSolved);
    console.log('badges count:', normalized.badges?.length);

    console.log('\n=== ALL STEPS PASSED ===');
  } catch (e) {
    console.log('\n=== FAILED ===');
    console.log('Error at step:', e.message);
    console.log('Stack:', e.stack);
  } finally {
    await puppeteerPool.closeAll();
    process.exit();
  }
};

test();
