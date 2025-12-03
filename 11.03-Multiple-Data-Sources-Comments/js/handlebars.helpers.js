// https://github.com/sachatrauwaen/OpenContent/blob/master/OpenContent/Components/Handlebars/HandlebarsEngine.cs

$(document).ready(function(){
	
	
	if (typeof Handlebars != 'undefined') {
		
        Handlebars.registerHelper('formatDateTime', function (context, format) {
            if (window.moment && context && moment(context).isValid()) {
                var f = format || "DD/MM/YYYY";
                return moment(context).format(f);
            } else {
                return context;   //  moment plugin is not available, context does not have a truthy value, or context is not a valid date
            }
        }); 
		
		// Truncate Words
		Handlebars.registerHelper ('truncateWords', function (str, len) {
			if (typeof str !== 'undefined') {
				if (str.length > len && str.length > 0) {
					var new_str = str + " ";
					new_str = str.substr (0, len);
					new_str = str.substr (0, new_str.lastIndexOf(" "));
					new_str = (new_str.length > 0) ? new_str : str.substr (0, len);

					return new Handlebars.SafeString ( new_str +'...' ); 
				}
				return str;
			}
		});
		
		// Replace
		Handlebars.registerHelper ('replace', function (original, str1, str2) {
			
			if (typeof original !== 'undefined') {
				var regexp = new RegExp(str1, "gi")

				var new_str = original.replace(regexp, str2) ;

				return new Handlebars.SafeString ( new_str ); 
			}
			
			return original

		});
		
		// Replace Newline
		Handlebars.registerHelper ('replacenewline', function (original, str1) {
			
			if (typeof original !== 'undefined') {
				var regexp = new RegExp('\n', "gi")

				var new_str = original.replace(regexp, str1) ;

				return new Handlebars.SafeString ( new_str ); 
			}
			
			return original

		});
		
		Handlebars.registerHelper ('convertHtmlToText', function (html) {

				var new_str = document.createElement("DIV");
				new_str.innerHTML = html;
				var out_str = new_str.textContent || new_str.innerText || "";

			return out_str;
		});
		
		Handlebars.registerHelper ('equal', function (x, y) {

				if (x.toString() == y.toString()){
					return options.fn(this);
				}
		});		
		
		Handlebars.registerHelper ('multiply', function (x, y) {
			
				return parseInt(x, 10) * parseInt(y, 10);
				
		});
		
	
    }
	
});