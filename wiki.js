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

            var paragraphs = $(data).find('div#mw-content-text > p');
            for (var k = 0; k < paragraphs.length; ++k) {
                var content = paragraphs.eq(k).text().replace(/\[[1-9]*\]/g, ''); // no citations
                var sentence_end = content.match(/["'\)0-9a-zA-Z]{2}\.(\s|$)/); // look for sentence
                if (sentence_end) {
			        // Extract the first sentence
                    var first_sentence = content.substr(0, sentence_end.index + sentence_end[0].length);                
			        e.currentTarget.title = first_sentence;                    
                    return; // we're done
                }
            }

		});
	});
});