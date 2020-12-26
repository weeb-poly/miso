// includes //
const https = require('https')
fs = require('fs');

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
-- NOTE: proof of consept in node.js. For the manga roulette this would use fetch
input: seed for manga (int), set of chapters (int)
output: returns a hashtable of of languages with a hastable of chapters and the links
 				for each page in them
purpose: gets the approite
usage:
*/
function getFromMangaDex(seed, chapterNumbers){
	let url = 'https://mangadex.org/api/manga/' + seed;
	// get request for a random seed
	https.get(url, (resp) => {
		let data = '';
		// get all the data from the chunk
		resp.on('data', (chunk) => {
			data += chunk;
		});

		resp.on('end', () => {
			// data contains the json data gotten from the mangadex api
			let mangaData = JSON.parse(data);
			let coverURL = "https://mangadex.org/manga" + mangaData["manga"]["cover_url"];
			let lewd = mangaData["manga"]["hentai"]; // 0 is SFW and 1 is NSFW
			let chapters = lewd ? ({"cover": {1: coverURL}}) : ({"cover": {0: coverURL}}); // init with cover url
			// sets a hashtable of languages that lead to a hashmap of chapters,
			// with links to each page in the chapter in an array
			// ex: {English: {chapter hash: [pageUrl1, pageUrl2]} }
			grabMangaDexChapters(mangaData.chapter, chapterNumbers, chapters);
			return chapters;
		});

	}).on("error", (err) => {
		console.log("Error: " + err.message)
	});
}
// getFromMangaDex(1223, [1]);

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
-- NOTE: Due to how mangadex works, the url's provided are perishable
--			 The chapter URL's change periodically. If you are trying to download them,
--       do it sooner than later
input: jsonData for chapters, the chapters you want, array to store urls
output: no return type. fills in the chapterTable with url's
purpose: 
usage:
*/
function grabMangaDexChapters(jsonData, chapterSet, chapterTable){
	let chapterUrl = 'https://mangadex.org/api/chapters';
	let tempTable = [];
	for (hash in jsonData){
		let lang = jsonData[hash].lang_name;
		if (chapterSet.has(jsonData[hash]["chapter"])){ // if you find the chapter you want
			chapterTable[hash] = lang;
			tempTable.append(hash); // store the hash along with its langauge
		}
	}
	// do the get requests here for the urls
	tempTable.forEach((item) => {
		https.get((chapterUrl + item), (resp) => {
			let data = '';
			resp.on(data, (chunk)=>{data += chunk;});
			let info = JSON.parse(data); // contains the json data

			let serverURL = info.server;
			let imageName = info.page_array;
			let chapterHash = info.hash;
			let pageURL = serverURL + chapterHash + "/" + imagename;
			console.log(pageURL);
			// check url if it is down or not
			// if you cannot get a request out of it, use the backup
		}).on("error", (err) => {
			console.log("Error while getting chapter page: ", err.message);
		});
	});
}
