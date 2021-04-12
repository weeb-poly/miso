// includes
const common = require("../shared/shared.js")
/*
-- NOTE:

*/

// document.getElementsByClassName("thumbs")[0].querySelector("img").src;

function nhentai(url){
  await common.scrapeTags(url, () = {
    // this cursed query is for getting the number of pages that are
    document.querySelectorAll("#info section div:nth-child(8) span a span")[0].innerText;
  },(pageNum) => {
    for(i = 0; i < pageNum; i++) common.download("https://i." + url + "/" + i + ".jpg");
  });
}
