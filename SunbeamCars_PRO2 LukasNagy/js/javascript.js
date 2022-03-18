let biler = []; // Global variabel, kendt af alle
fetch("https://api.jsonbin.io/b/6137477a85791e1732a15029") // Husk at URL skal passe med json data
	.then(function (data) {
		//støbt i cement
		return data.json(); //støbt i cement
	}) //støbt i cement
	.then(function (post) {
		biler = post.billiste; // Global variable sat til JSON indhold
	});

const sektion = document.getElementById("bil_sektion");
const skabelon = document.getElementById("skabelon_output");
const personer = document.getElementById("personer");
const kufferter = document.getElementById("kufferter");
const formular = document.getElementById("formular");
const afhentningsdato = document.getElementById("afhentning");
const afleveringsdato = document.getElementById("aflevering");

formular.addEventListener("submit", function (event) {
	event.preventDefault();
	if (valideDatoer(afhentningsdato.value, afleveringsdato.value)) {
		sektion.innerHTML = ""; //Nulstiller output-sektion
		for (const bil of biler) {
			if (kufferter.value <= bil.kufferter && personer.value <= bil.personer) {
				const antaldage = beregnAntalLejedage(
					afhentningsdato.value,
					afleveringsdato.value
				);
				const klon = skabelon.content.cloneNode(true);
				const bilMM = klon.querySelector(".bilMM");
				const billedtag = klon.querySelector("img");
				const kategori = klon.querySelector(".kategori");
				const antalpersoner = klon.querySelector(".antalpersoner");
				const antalkufferter = klon.querySelector(".antalkufferter");
				const lejeudgift = klon.querySelector(".lejeudgift");
				const link = klon.querySelector("a");
				// What I did was change this from "bilste" to "bil" because it couldn't find it otherwise.
				// Everything else was working though and when you click on the button now it takes you to the "page2.html" and displays the information
				// The image was not showing because this was bil.billeder, instead of bil.billede
				
				/*
				sessionStorage.setItem("bilMM", bil.modelMM);
                sessionStorage.setItem("afhentningsDato", afhentningsdato.value);
                sessionStorage.setItem("afleveringsDato", afleveringsdato.value);
                sessionStorage.setItem("dage", dage);
                sessionStorage.setItem("lejeudgift", calculatePrice(dage, leje.udgift));
				*/

				sessionStorage.setItem("brand", bil.bilmaerke);
                sessionStorage.setItem("category", bil.kategori);
                sessionStorage.setItem("persons", bil.personer);
                sessionStorage.setItem("suitcases", bil.kufferter);

				link.href = `accessories.html?image=${bil.billede}&brand=${bil.bilmaerke}&category=${bil.kategori}&persons=${bil.personer}&suitcases=${bil.kufferter}&tillaeg=${beregnLejeudgift(antaldage, bil.tillaeg)}`;
				billedtag.src = bil.billede;
				billedtag.alt = bil.billedtekst;
				bilMM.textContent = bil.bilmaerke;
				kategori.textContent += bil.kategori;
				antalkufferter.textContent += bil.kufferter;
				antalpersoner.textContent += bil.personer;
				lejeudgift.textContent =
					"kr. " + beregnLejeudgift(antaldage, bil.tillaeg);
				sektion.appendChild(klon);
			}
		}
	} else {
		sektion.innerText =
			"Enter a pick-up date that is earlier than the return date.";
	}
});

function valideDatoer(afhentningsdato, afleveringsdato) {
	const afhentning = new Date(afhentningsdato);
	const aflevering = new Date(afleveringsdato);
	if (afhentning > aflevering) {
		return false;
	} else {
		return true;
	}
}

function beregnAntalLejedage(afhentningsdato, afleveringsdato) {
	const AFHENTNING = new Date(afhentningsdato);
	const AFLEVERING = new Date(afleveringsdato);
	const FORSKELITID = AFLEVERING.getTime() - AFHENTNING.getTime();
	const FORSKELIDAGE = FORSKELITID / (1000 * 3600 * 24) + 1;
	return FORSKELIDAGE;
}

function beregnLejeudgift(antaldage, biltillaeg) {
	const MOMS = 0.25;
	const GRUNDBELOEB = 495;
	const PRISPRDAG = 100;
	const LEJEUDGIFT =
		(GRUNDBELOEB + (antaldage * PRISPRDAG) + (antaldage * biltillaeg)) * (1 + MOMS);
	return LEJEUDGIFT.toFixed(2);
}
