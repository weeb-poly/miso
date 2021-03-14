
/** shared functions for all files**/

// includes
common = require('../shared/shared.js')
mangadex = require('../api/mangadex.js')

/*
-- NOTE: needs to be verified that this works. should work however
input: set of chapters (set of ints), manga number
output: downloads all the pages
purpose:
usage: mangadex(set())
*/
function mangadex(chapters, manga){
    getFromMangaDex(manga, chapters);

}
