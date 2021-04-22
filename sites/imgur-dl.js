const common = require("../shared/shared.js");

// function that downloads imgur albumn
function imgur (url){
  common.pageEval(url, () => {
    // first load all images
    but = document.querySelector("button.loadMore");

    while (but !== null){
    	but.click();
    	but = document.querySelector("button.loadMore");
    }
    // this cursed query is for getting the number of pages that are
    let imgArray = [];
    document.getElementsByClassName("Gallery-Content--media").forEach((item) => {
  	   imgArray.push(item.querySelector("img").src);
    });
    return imgArray;
  },(data) => {
    data.forEach((url, i) => {
      download(url, i + url.match(/\.[0-9a-z]+$/i)[0]);
    });
  });
}
