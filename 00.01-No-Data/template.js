// Set backgroiund color and padding of Open Content Module
let setBgColor = function(){
	let _myModule = document.getElementsByClassName("DnnModule-OpenContent")[0];

	_myModule.style.backgroundColor = "#eeeeee"; 
	_myModule.style.padding = "1em"; 
}

document.addEventListener("DOMContentLoaded", function() {
  setBgColor();
});



