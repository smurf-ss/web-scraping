const cheerio = require("cheerio");
const axios = require("axios");

(async () => {
  const html = await axios.get("https://codequiz.azurewebsites.net", {
    headers: {
      Cookie: "hasCookie=true;",
    },
  });
  const $cheerio = await cheerio.load(html.data);

  const scrapedData = [];

  $cheerio("body > table > tbody > tr").each((index, element) => {
    if (index === 0) return;
    const tds = $cheerio(element).find("td");
    const fundName = $cheerio(tds[0]).text();
    const nav = $cheerio(tds[1]).text();
    const tableRow = { fundName, nav };
    scrapedData.push(tableRow);
  });

  const findFundNAV = (name) =>
    scrapedData.find((item) => item.fundName.trim() === name).nav;

  console.log("BEQSSF", findFundNAV("BEQSSF"));
  console.log("BM70SSF", findFundNAV("BM70SSF"));
})();
