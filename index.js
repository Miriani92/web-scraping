const express = require("express");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
//h-100 w-100 border-0 font-size-12 font-medium pr-md-100px pr-36px
const URL = "https://www.mymarket.ge/ka/";
const app = express();

const getData = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URL);
  await page.type(".devsite-search-field", "Headless Chrome");
  await browser.close();
};

getData();
const PORT = 4000;

app.get("/results", (req, res) => {
  res.send("Hello from the server");
});

app.listen(PORT, () => console.log(`port is runing on port ${PORT}`));
