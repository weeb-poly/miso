// includes
const https = require('https')
fs = require('fs')
common = require('../shared/shared.js')

/*
-- Note: this is just a test to see what i can get from webtoons
*/
async function getFromWebtoons(url){
   await https.get(url, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            console.log(data);    
        });

        resp.on("error", (err) => {
            console.log("Error: " + err.message)
        });
    }
   ) 
}

getFromWebtoons("https://www.webtoons.com/en/romance/lore-olympus/episode-1/viewer?title_no=1320&episode_no=1")
