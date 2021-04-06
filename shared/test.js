const puppeteer = require('puppeteer');

/*
-- NOTE: todo
purpose: get all items with a particular tag, and return them in an array
*/
async function getAllElement(url, tag){

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  

  await browser.close();
}

/*
-- NOTE: todo
general screenshot of particular element
*/
async function screenshot(element){

}

/*
NOTE: todo
function for grabbing all images with a particular path url
*/
async function grab(regexURL){


}
