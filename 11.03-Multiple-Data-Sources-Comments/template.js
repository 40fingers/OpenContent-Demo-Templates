(function ($) {
    $(document).ready(function () {
        initPage(document);

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
	


}(jQuery));