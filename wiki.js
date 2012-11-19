$(function(){

	$("div#mw-content-text a").mouseover(function(e){
		
		$.get(this.href, function(data){	
			// Get the first paragraph as plain text
			var first_paragraph = $(data).find('div#mw-content-text p')[0]
			
			// Extract the first sentence
			// TODO: regex based, not to split on inner dots
			var first_sentence = $(first_paragraph).text().split('.')[0] + '.'
			var first_sentence = first_sentence.replace(/\[[1-9]*\]/, '');
			
			e.currentTarget.title = first_sentence;
		})
	});
})