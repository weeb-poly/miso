/** shared functions for all files**/

// includes
const https = require('https')
const puppeteer = require('puppeteer-core');
fs = require('fs')


/*
-- NOTE: JS has no random seed function, so I had to write my own
--       the Von Neumann method does have flaws, but it was quick to implement
input: integer
output: integer that is at maximum, the same length
Purpose: give it one manga number, and it gives you a random one. Is pseudo-random
Usage: seededRandom(11111) -> 2343
*/
function seededRandom(number){
	// runs the von neumann method
	let tempRand = number ** 2;
	let temp = tempRand.toString();
	// this makes sure the square is the same length as the number you want to generate
	while((temp.length - number.toString().length) % 2 === 1) temp = "0" + temp;
	let removeChar = (temp.length - number.toString().length) / 2;
	return parseInt(temp.substring(removeChar, temp.length - removeChar));
}

/*
-- NOTE: This does not check if the URL you are giving it is an image. use carefully
input: url (string), image name (string)
output: no return type (downloads image specified)
purpose:
usage:
*/
function download(url, imagename){
	https.get(url, (resp) => {
		let data = '';
		resp.setEncoding('binary');
		resp.on('data', (chunk) => {
			data += chunk;
		});
		resp.on('end', () => {
			fs.writeFile(imagename, data, 'binary', (err) => {
            if (err) throw err;
            console.log('File saved.');
      });
		});

	});
}

/*
-- NOTE: untested, still need to test
-- 			 ment to be a general purpose API get function
-- 			 mostly just Mangadex and XKCD
*/
async function getFromAPI(apiendpoint, callback){
	await https.get(apiendpoint, (resp) => {
		let data = '';
		resp.on("data", (chunk) =>{
			data += chunk;
		});
		resp.on("end", () => {
				let jsonData = JSON.parse(data);
				callback(jsonData);
		});

		resp.on("error", (err) => {
			console.log("Error: " + err.message);
		});
	});
}

/*
-- NOTE: untested
-- 			 start of scraping with puppeteer
*/

async function pageEval(url, pageScript , callback){
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);

	const data = await page.evaluate(pageScript);
	callback(data);
	// await page.screenshot({ path: 'example.png' });

	await browser.close();
}

/*
-- NOTE: untested
--       gets all the html from the
*/
async function grabHTML(url, callback){
	await searchPageFor(url, "*", callback);
}

module.exports = { seededRandom, download, getFromAPI, pageEval };
