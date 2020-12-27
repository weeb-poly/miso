// includes //
const https = require('https')
fs = require('fs');

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
		console.log(lang);
		// the chater number when you get it is a string
		if (chapterSet.has(parseInt(jsonData[hash].chapter))){
			// chapterTable[hash] = lang;	
			tempTable.push(hash); // store the hash along with its langauge
		    if (lang in chapterTable){
				chapterTable[lang][hash] = [];
			}
			else{
				chapterTable[lang] = {};
				chapterTable[lang][hash] = [];
			}
		    
		}
	}
    console.log(chapterTable);
	
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

let chapters = new Set([1, 2, 3]);
getFromMangaDex(1223, chapters);
