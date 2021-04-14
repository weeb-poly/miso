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
  common.pageEval(url, () = {
    // this cursed query is for getting the number of pages that are
    var temp = document.getElementsByClassName("thumb-container");
    return temp[temp.length - 1].querySelector("img").dataset.src;
  },(data) => {
    let dataClone = data.toString();
    let pagenum = dataClone.match(/\/[0-9]+t/)[0].match(/[0-9]+/)[0]; // gets the total number of pages
    download(dataClone.replace(/t\./, 'i.').replace(/t\./g, "."), "example.jpg");
      //download(data, "example.jpg");
    // for(let i = 0; i < pageNum; i++) common.download(newURL);
  });
}
