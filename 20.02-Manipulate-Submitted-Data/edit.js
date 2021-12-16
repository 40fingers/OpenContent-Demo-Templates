(function ($) {
    $(document).ready(function () {

    });
	

	// This Demo Template shows how you can manipulate the Data in the edit Form in Open Content using Javascript.
	// If your template folder contains a file named "edit.js", this file will be loaded when the "Edit Content" Form is loaded.
	// This allow you to manipulate the Entered Data / Fields.
	
	// When the Open Content Edit form had been Rendered
    $(document).on("postRender.opencontent", function (event, control, moduleid, id, sf, action) {
		
		// Demo remove for production
		console.log("Open Content Edit-Form Rendered");
		
		// Get a Field
		var _fieldDate = control.childrenByPropertyId["Date"];
	
       // Get the Value from the Field
       var _date = _fieldDate.picker.date();
	   
		console.log("Currently Selected Date: " + _date);

		// When the Date field has changed
        _fieldDate.on("change", function () {
			
           console.log("Date changed to: " + _fieldDate.picker.date());
        });
		
    });
	
	// Before the data is submitted to the server
    $(document).on("beforeSubmit.opencontent", function (event, value, moduleid, id, sf, action) {
		
		// Demo remove for production
		console.log("Open Content Edit-Form Before Submit");
		
        // Extract the Year from the Date and insert that in the Year field
		var _date = value.Date;
		
		var _year = parseInt(_date.substring(0,4));

		// Now insert the calculated Year in the Year field.
		value.Year = _year - 100;
		
		
		
    });
	
	// After the data has been submitted to the server
    $(document).on("afterSubmit.opencontent", function (event, value, moduleid, id, sf, action) {
		
		// Demo remove for production
		console.log("Open Content Edit-Form After Submit");
		

    });
	
	
}(jQuery));
