function autocomplete(input, optionList) {
	/*the autocomplete function takes two arguments,
		the text field element and an array of possible autocompleted values:*/
	var currentFocus;
	/*execute a function when someone writes in the text field:*/
	input.addEventListener("input", function (e) {
		var a,
			b,
			i,
			val = this.value;
		/*close any already open lists of autocompleted values*/
		closeAllLists();
		if (!val) {
			return false;
		}
		currentFocus = -1;
		/*create a DIV element that will contain the items (values):*/
		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		/*append the DIV element as a child of the autocomplete container:*/
		this.parentNode.appendChild(a);
		/*for each item in the array...*/
		for (i = 0; i < optionList.length; i++) {
			/*check if the item starts with the same letters as the text field value:*/
			if (optionList[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
				/*create a DIV element for each matching element:*/
				b = document.createElement("DIV");
				/*make the matching letters bold:*/
				b.innerHTML = "<strong>" + optionList[i].name.substr(0, val.length) + "</strong>";
				b.innerHTML += optionList[i].name.substr(val.length);
				/*insert a input field that will hold the current array item's value:*/
				b.innerHTML += "<input type='hidden' value='" + optionList[i].name + "'>";
				/*execute a function when someone clicks on the item value (DIV element):*/
				b.addEventListener("click", function (e) {
					/*insert the value for the autocomplete text field:*/
					input.value = this.getElementsByTagName("input")[0].value;
					/*close the list of autocompleted values,
									(or any other open lists of autocompleted values:*/
					closeAllLists();
				});
				a.appendChild(b);
			}
		}
	});
	/*execute a function presses a key on the keyboard:*/
	input.addEventListener("keydown", function (e) {
		var x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
			/*If the arrow DOWN key is pressed,
					  increase the currentFocus variable:*/
			currentFocus++;
			/*and and make the current item more visible:*/
			addActive(x);
		} else if (e.keyCode == 38) {
			//up
			/*If the arrow UP key is pressed,
					  decrease the currentFocus variable:*/
			currentFocus--;
			/*and and make the current item more visible:*/
			addActive(x);
		} else if (e.keyCode == 13) {
			/*If the ENTER key is pressed, prevent the form from being submitted,*/
			e.preventDefault();
			if (currentFocus > -1) {
				/*and simulate a click on the "active" item:*/
				if (x) x[currentFocus].click();
			}
		}
	});
	function addActive(x) {
		/*a function to classify an item as "active":*/
		if (!x) return false;
		/*start by removing the "active" class on all items:*/
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = x.length - 1;
		/*add class "autocomplete-active":*/
		x[currentFocus].classList.add("autocomplete-active");
	}
	function removeActive(x) {
		/*a function to remove the "active" class from all autocomplete items:*/
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove("autocomplete-active");
		}
	}
	function closeAllLists(elmnt) {
		/*close all autocomplete lists in the document,
			  except the one passed as an argument:*/
		var x = document.getElementsByClassName("autocomplete-items");
		for (var i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != input) {
				x[i].parentNode.removeChild(x[i]);
			}
		}
	}
	/*execute a function when someone clicks in the document:*/
	document.addEventListener("click", function (e) {
		closeAllLists(e.target);
	});
}

/*An array containing all the country names in the world:*/
var countries = [{ "id": 1, "name": "آذربایجان شرقی" },
{ "id": 2, "name": "آذربایجان غربی" },
{ "id": 3, "name": "اردبیل" },
{ "id": 4, "name": "اصفهان" },
{ "id": 5, "name": "البرز" },
{ "id": 6, "name": "ایلام" },
{ "id": 7, "name": "بوشهر" },
{ "id": 8, "name": "تهران" },
{ "id": 9, "name": "چهارمحال وبختیاری" },
{ "id": 10, "name": "خراسان جنوبی" },
{ "id": 11, "name": "خراسان رضوی" },
{ "id": 12, "name": "خراسان شمالی" },
{ "id": 13, "name": "خوزستان" },
{ "id": 14, "name": "زنجان" },
{ "id": 15, "name": "سمنان" },
{ "id": 16, "name": "سیستان وبلوچستان" },
{ "id": 17, "name": "فارس" },
{ "id": 18, "name": "قزوین" },
{ "id": 19, "name": "قم" },
{ "id": 20, "name": "کردستان" },
{ "id": 21, "name": "کرمان" },
{ "id": 22, "name": "کرمانشاه" },
{ "id": 23, "name": "کهگیلویه وبویراحمد" },
{ "id": 24, "name": "گلستان" },
{ "id": 25, "name": "گیلان" },
{ "id": 26, "name": "لرستان" },
{ "id": 27, "name": "مازندران" },
{ "id": 28, "name": "مرکزی" },
{ "id": 29, "name": "هرمزگان" },
{ "id": 30, "name": "همدان" },
{ "id": 31, "name": "یزد" }]
autocomplete(document.getElementById("source-city-input"), countries);
autocomplete(document.getElementById("destination-city-input"), countries);

const passengerNumberInput = document.getElementById("passenger-number-input")
passengerNumberInput.addEventListener("input", function (e) {
	if (e.target.value < 1) {
		passengerNumberInput.value = 1
	}
})

function searchTicket() {
	window.location.href = '../ticket_list/ticket'
}


function incrementPassengerNumber() {
	passengerNumberInput.value = passengerNumberInput.value === "" ? 1 : parseInt(passengerNumberInput.value) + 1
}
function decrementPassengerNumber() {
	passengerNumberInput.value = passengerNumberInput.value === "" ? 1 : 
	(parseInt(passengerNumberInput.value) - 1 < 1 ? 1 : parseInt(passengerNumberInput.value) - 1)
}