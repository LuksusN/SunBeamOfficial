let total = 0.00; // Global variable, total starts at zero


total = Math.abs(total + (URLDATA.get('tillaeg')));
        showTotal(); // Calls function showTotal to show current total

        // Event handler - check if checkbox is selected or not and 
        // adjust the total value accordingly
        function calculateTotal(checkbox, itemprice) {
            if (checkbox.checked === true) { // If the checkbox is seleted then ...
                total = Math.abs(total + parseFloat(itemprice));
            } else { // if it is not selected then ...
                total = Math.abs(total - parseFloat(itemprice));
            }
            showTotal();
        }

        // Shows total value on screen
        function showTotal() {
            const output = document.getElementById("totaloutput");
            output.innerText = `Total ${total.toLocaleString("da-DK", {style: "currency", currency: "DKK"})}`;
        }

        const form = document.getElementById("form");
        form.reset(); // Resets form every time page loads
        
        const checkboxes = document.getElementsByClassName("slist"); //Build an object list with checkboxes
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            let accessories = []; // Define shopping list
            for (const checkbox of checkboxes) {
                if (checkbox.checked === true) { // If the item is selected ...
                    accessories.push(checkbox.dataset.item + "(dkr. " + checkbox.value + ")"); // add it to the shopping list.
                }
            }

            // Stores information in sessionstorage
            sessionStorage.setItem("goods", JSON.stringify(accessories));
            sessionStorage.setItem("total", total.toLocaleString("da-DK", {style: "currency",currency: "DKK"}));

            location.href="receipt.html"; // Redirect user to page2.html
        })