(function ($) {
    $(document).ready(function () {
        initPage(document);
		setTagsLinks();
    });
    $(document).on("opencontent.change", function (event, element) {
        initPage(element);
    });
    var template = '';
    function initPage(element) {

        $(".jplist", element).each(function () {

			var moduleid = $(this).attr('data-moduleid');
            var moduleScope = $(this),
                self = moduleScope,
                sf = $.ServicesFramework($(this).attr('data-moduleid'));

            var $list = $('#demo .list'), 
                template = Handlebars.compile($('#jplist-template').html());


			// init jpList
            $(this).jplist({
                itemsBox: ".list", 
              itemPath: ".list-item", 
              panelPath: ".jplist-panel", 
              deepLinking: true, 
              dataSource: {
                    type: 'server', 
                server: {
                        ajax: {
                            data: {}, 
                            url: sf.getServiceRoot('OpenContent') + "JplistAPI/List", 
                            dataType: 'json', type: 'POST', 
                            beforeSend: sf.setModuleHeaders
                        }
                    }, 
					 render: function (dataItem, statuses) {
                        $list.html(template(dataItem.content));
                      
                       $(".categorylink", $list).click(function(e){
                            var id= $(this).data('id');
                            e.preventDefault(); 
                            $("input[data-path='"+id+"']").click();
                            return false;
                       });                                            
                        var logs = dataItem.content.Logs;
                        $.fn.openContent.printLogs('Module ' + moduleid + ' - jplist webapi', logs);
                    }
                }
            });
			
			//Block enter on input
			$(document).on("keydown", ".jplist input.textfilter", function(event) {
				if (event.key == "Enter") {
					event.preventDefault();
				}
			});
	
	
			 var isTyping = false;
            var typingHandler = null;
            var $textfilter = $(".textfilter", this);

            $textfilter.on('input', function (context) {
                if (isTyping) {
                    window.clearTimeout(typingHandler);
                }
                else {
                    isTyping = true;
                }

                typingHandler = window.setTimeout(function () {
                    isTyping = false;
                    $textfilter.trigger("keydelay");
                }, 1000);
            });
			
        });

    }
	
	function setTagsLinks(){
		
		var listPage = $('#article-detail').data('listpage');
		
		if(listPage > ''){
		
		var linkTemplate = listPage + '#Title,Summary,Tags:value={0}|paging:currentPage=0';
	
		var $tags = $("#tags");
		var tags = ($tags.text());
		
		var sOut = '';
		
		var objTags = tags.split(",");
		
		for (i=0; i< objTags.length; i++){
			
			if (i > 0) sOut += ", ";
			var value = objTags[i].trim();
			var url = '';
			
			url = linkTemplate.replace('{0}', value)

			var link = '<a href="' + url + '">' +  objTags[i].trim() + '</a>';
			sOut += link;
		
		}
		
		$tags.html(sOut);
		}
		
		
	}

}(jQuery));