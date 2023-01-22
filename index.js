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

  await page.goto(URL);

  const closeAddelement = await page.waitForSelector(
    selector.addCloserSelector
  );

  await closeAddelement.click();

  const laptopSelector = await page.waitForSelector(selector.laptopSelector);

  await laptopSelector.click();
  await browser.close();
};

startBrowser();

app.get("/results", (req, res) => {
  res.send("Hello from the server");
});

app.listen(PORT, () => console.log(`port is runing on port ${PORT}`));
