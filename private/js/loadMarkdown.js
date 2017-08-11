(function($) {
// Load readme content
$.ajax({
    url: "https://rawgit.com/hputzek/redirector/master/README.md",
    dataType: 'text',
    success: function(data) {

        // Convert readme from markdown to html
        var converter = new Markdown.Converter();
        // Show html
        $("[data-content=\"readme.md\"]")
            .html(converter.makeHtml(data)).find('img')
            .each(function(index, element){
                $(element).attr('src','https://rawgit.com/hputzek/redirector/master/' + $(element).attr('src'));
            });


        $('code, pre').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    }
});


})(jQuery);
