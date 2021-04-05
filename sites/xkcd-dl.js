// TODO: use api for this
// includes
common = require("../shared.js")

function downloader(jsonData){
  let title = jsonData["safe_title"];
  let img = jsonData["img"];
  common.download(img, title);
}

async function xkcd(num){
  let url = "https://xkcd.com/" + num + "/info.0.json";
  common.getFromAPI(url, downloader);
}

/*
-- NOTE: needs to be tested
--       gets the current xkcd webcommic
*/
async function xkcd_curr(){
  common.getFromAPI("http://xkcd.com/info.0.json", downloader);
}

async function xkcd_rand(){
  common.getFromAPI("http://xkcd.com/info.0.json", (jsonData) => {
    common.getFromAPI("https://xkcd.com/" + (Math.floor(Math.random(jsonData["num"]) * 100)) + "/info.0.json", (data) => {
      common.download(data["img"], data["title"]);
    });
  });
}
