// Test that simulates the full service call flow
import PlatformService from './services/platform.service.js';
import { puppeteerPool } from './utils/puppeteerPool.js';

const test = async () => {
  console.log('=== FULL SERVICE TEST ===');

  try {
    const platformService = new PlatformService();
    console.log('Service instantiated');

    console.log('Calling fetchHackerRankData("rohanrathod54321")...');
    const result = await platformService.fetchHackerRankData('rohanrathod54321');

    console.log('=== SUCCESS ===');
    console.log('Result:', JSON.stringify(result, null, 2));
  } catch (e) {
    console.log('=== SERVICE FAILED ===');
    console.log('Error Name:', e.name);
    console.log('Error Message:', e.message);
    console.log('Error Code:', e.statusCode || e.code || 'N/A');
    console.log('Stack:', e.stack);
  } finally {
    await puppeteerPool.closeAll();
    process.exit();
  }
};

test();
