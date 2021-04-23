// TODO: look into using api
// decided to use scarping instead of api because it was so simple
const common = require("../shared/shared.js");
//
function pixiv(url){
  common.pageEval(url, () => {
    return document.querySelector("figure a img").src;
  }, (data) => {
    common.download(data, );
  });
}
