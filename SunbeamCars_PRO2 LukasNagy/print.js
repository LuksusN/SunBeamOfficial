const OUTPUT = document.getElementById ("final_output")
const firstName = sessionStorage.getItem ("customerName")
const total = sessionStorage.getItem ("total")
const lastname = sessionStorage.getItem ("lastName")
const persons = sessionStorage.getItem ("persons")
const category = sessionStorage.getItem ("category")
const number = sessionStorage.getItem ("number")
const goods = JSON.parse(sessionStorage.getItem ("goods"))
const streetname = sessionStorage.getItem ("streetName")
const brand = sessionStorage.getItem ("brand")
const suitcases = sessionStorage.getItem ("suitcases")
OUTPUT.innerHTML = `
First Name: ${firstName}
<br>Last Name: ${lastname}
<br>Persons: ${persons}
<br>category: ${category}
<br>Flat number: ${number}
<br>Street Name: ${streetname}
<br>Make: ${brand}
<br>Suitcases: ${suitcases}

<br>Total: ${total}

<h3>Accessories</h3>`
for(const item of goods){
    OUTPUT.insertAdjacentHTML("beforeend", item+"<br>")
}