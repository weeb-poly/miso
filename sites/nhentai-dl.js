// includes
const common = require("../shared/shared.js")
/*
-- NOTE:

*/

// gets the actual url
/*
var temp = document.getElementsByClassName("thumb-container");

temp[temp.length - 1].querySelector("img").dataset.src;
*/
function nhentai(url){
  await common.scrapeTags(url, () = {
    // this cursed query is for getting the number of pages that are
    var temp = document.getElementsByClassName("thumb-container");
    temp[temp.length - 1].querySelector("img").dataset.src;
  },(imgURL) => {
    let pageNum = imgURL.match(/\/[0-9]+t/);
    let newURL = imgURL.replace(/t\./, 'i.').replaceAll(/t\./ig, ".");
    for(let i = 0; i < pageNum; i++) common.download(newURL);
  });
}
