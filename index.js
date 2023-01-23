const express = require("express");
const selector = require("./selectors");
const puppeteer = require("puppeteer");
//const cheerio = require("cheerio");
//const axios = require("axios");

const URL =
  "https://www.mymarket.ge/ka/search/1064/iyideba-teqnika/?CatID=1064";

const app = express();
const PORT = 4000;

const startBrowser = async () => {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });

  await page.goto(URL);

  const closeAddelement = await page.waitForSelector(
    selector.addCloserSelector
  );

  // close  modal
  await closeAddelement.click();

  // go to technique section

  const technique = await page.waitForSelector(selector.laptopSelector);
  await technique.click();

  // go to the leptops section

  const laptopSectionLink = await page.waitForSelector(selector.laptopLink);
  await laptopSectionLink.click();

  // click on private button

  const privateButton = await page.waitForSelector(selector.privateButton);
  await privateButton.click();

  // scroll down and choose ddr options

  const ddr4 = await page.waitForSelector(selector.DDR4);
  const ddr5 = await page.waitForSelector(selector.DDR5);
  await page.evaluate((PageItem) => PageItem.scrollIntoView(), ddr4);
  await ddr4.click();
  await ddr5.click();

  // scroll down and choose 16 g of ram

  const ram = await page.waitForSelector(selector.sixteenGig);
  await page.evaluate((PageItem) => PageItem.scrollIntoView(), ram);
  await ram.click();

  // scroll up and insert the starting price

  const inputField = await page.waitForSelector(selector.priceInput);
  await page.evaluate((PageItem) => PageItem.scrollIntoView(), inputField);
  await page.$eval(selector.priceInput, (element) => {
    element.value = 1300;
  });

  // scroll up to begginig

  await page.evaluate(() => {
    window.scroll(0, 0);
  });

  //await browser.close();
};

startBrowser();

app.get("/results", (req, res) => {
  res.send("Hello from the server");
});

app.listen(PORT, () => console.log(`port is runing on port ${PORT}`));
