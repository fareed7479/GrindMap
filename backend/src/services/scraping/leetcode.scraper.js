import puppeteer from "puppeteer";
import { createBrowser } from "../config/puppeeteer.js";

export async function scrapeLeetCode(username) {
  let browser;
  try {
    browser = await createBrowser();
    const page = await browser.newPage();

    // Navigate to LeetCode profile
    await page.goto(`https://leetcode.com/${username}/`, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Wait for profile content to load (React rendering)
    await page.waitForTimeout(3000);

    // Extract data from the page
    const data = await page.evaluate(() => {
      // Helper function to extract text content safely
      const getText = (selector) => {
        const element = document.querySelector(selector);
        return element ? element.textContent.trim() : null;
      };

      // Helper function to extract number from text
      const extractNumber = (text) => {
        if (!text) return 0;
        const match = text.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
      };

      // Try multiple selectors for different data points
      const totalSolved = extractNumber(
        getText('[data-cy="problem-solved"]') ||
        getText('.text-[24px]') ||
        getText('.total-solved') ||
        getText('[class*="solved"]')
      );

      const easySolved = extractNumber(
        getText('[data-cy="easy-solved"]') ||
        getText('.text-green-500') ||
        getText('.easy-count')
      );

      const mediumSolved = extractNumber(
        getText('[data-cy="medium-solved"]') ||
        getText('.text-yellow-500') ||
        getText('.medium-count')
      );

      const hardSolved = extractNumber(
        getText('[data-cy="hard-solved"]') ||
        getText('.text-red-500') ||
        getText('.hard-count')
      );

      const ranking = extractNumber(
        getText('[data-cy="ranking"]') ||
        getText('.ranking') ||
        getText('[class*="rank"]')
      );

      const reputation = extractNumber(
        getText('[data-cy="reputation"]') ||
        getText('.reputation') ||
        getText('[class*="reputation"]')
      );

      return {
        totalSolved: totalSolved || 0,
        easySolved: easySolved || 0,
        mediumSolved: mediumSolved || 0,
        hardSolved: hardSolved || 0,
        ranking: ranking || null,
        reputation: reputation || null
      };
    });

    // Check if profile exists (look for error messages or empty data)
    const pageTitle = await page.title();
    if (pageTitle.includes('404') || pageTitle.includes('Not Found') || data.totalSolved === 0) {
      throw new Error(`LeetCode user '${username}' not found or has no solved problems`);
    }

    return {
      platform: "LEETCODE",
      username,
      data
    };

  } catch (err) {
    throw new Error(`Failed to fetch LeetCode data: ${err.message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
