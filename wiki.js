/* A Chrome extension that adds a one-sentence description
to Wikipedia links.

This is how it works: when you mouse-over a link in a Wiki
article, it fetches the first sentence of the text and
adds it to the "title" attribute of the link.
*/


$(function(){

    var cache = {};

    var cacheget = function(href, cb) {
        if (cache[href]) cb(cache[href]);
        else $.get(href, function(data) {
            cache[href] = data;
            cb(data);
        });
    }

	$("div#mw-content-text a").mouseover(function(e){
		
		cacheget(this.href, function(data){	
			// Get the first paragraph as plain text without citations.
			var first_paragraph = $(data).find('div#mw-content-text > p').eq(0)
                .text().replace(/\[[1-9]*\]/, '');
			
			// Extract the first sentence
            var sentence_end = first_paragraph.match(/["'\)0-9a-zA-Z]{2}\.(\s|$)/);
            var first_sentence = first_paragraph.substr(0, sentence_end.index + sentence_end[0].length);
			
			e.currentTarget.title = first_sentence;
		})
	});
});