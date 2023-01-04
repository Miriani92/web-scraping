// Basic application
import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://developers.google.com/web/");

  // Type into search box.
  await page.type(".devsite-search-field", "Headless Chrome");

  // Wait for suggest overlay to appear and click "show all results".
  const allResultsSelector = ".devsite-suggest-all-results";
  await page.waitForSelector(allResultsSelector);
  await page.click(allResultsSelector);

  // Wait for the results page to load and display the results.
  const resultsSelector = ".gsc-results .gs-title";
  await page.waitForSelector(resultsSelector);

  // Extract the results from the page.
  const links = await page.evaluate((resultsSelector) => {
    return [...document.querySelectorAll(resultsSelector)].map((anchor) => {
      const title = anchor.textContent.split("|")[0].trim();
      return `${title} - ${anchor.href}`;
    });
  }, resultsSelector);

  // Print all the files.
  console.log(links.join("\n"));

  await browser.close();
})();
//=================================================================
// interact with dom

import puppeteer from "puppeteer";

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch();

  // Create a page
  const page = await browser.newPage();

  // Go to your site
  await page.goto("YOUR_SITE");

  // Query for an element handle.
  const element = await page.waitForSelector("div > .class-name");

  // Do something with element...
  await element.click(); // Just an example.

  // Dispose of handle
  await element.dispose();

  // Close browser.
  await browser.close();
})();

//=======================
// selectors
// Automatic
//const element = await page.waitForSelector('div > input');
//// Manual
//const element = (await page.waitForSelector(
//'div > .class-name-for-input'
//)) as HTMLInputElement;
//needs the coersion and typescript

//=======================

//buuit in selectors

//Every built-in selector starts with a prefix .../
//==========================
//xpaths
// There is not type deduction for XPaths.
const node = await page.waitForSelector("xpath/h2");
//
