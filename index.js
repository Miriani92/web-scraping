const express = require("express");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const axios = require("axios");
const URL = "https://www.mymarket.ge/ka/";

const app = express();
const PORT = 4000;
const getHtml = async () => {
  const res = await axios(URL);
  const $ = cheerio.load(res.data, null, false);
  const allElem = $("#root").children();
  for (const el of allElem.children()) {
    console.log(el);
  }
};
getHtml();

app.get("/results", (req, res) => {
  res.send("Hello from the server");
});

app.listen(PORT, () => console.log(`port is runing on port ${PORT}`));
