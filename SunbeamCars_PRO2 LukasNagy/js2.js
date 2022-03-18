const URL = window.location.search;
const URLDATA = new URLSearchParams(URL);

const OUTPUT = document.getElementById("formoutput");
OUTPUT.innerHTML =
	"<br>" +
	`<img src=/${URLDATA.get("image")} />` +
	"<br>Brand: " +
	URLDATA.get("brand") +
	" <br>" +
	"Category: " +
	URLDATA.get("category") +
	"<br>" +
	"Persons: " +
	URLDATA.get("persons") +
	"<br>Suitcases: " +
	URLDATA.get("suitcases") +
	"</br>";
