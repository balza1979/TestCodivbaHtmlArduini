/* 
    js/ui.js : core - Gestione interfaccia Arduino
    Percorso completo: /js/ui.js
    Data: 13/04/2026 - Ore 07:12
    Sezione: Gestione pulsanti categoria (multi-selezione)
*/

// Stato categorie selezionate
let categorieSelezionate = new Set();

// Funzione per inizializzare i pulsanti categoria
function setupCategoryButtons() {
    const buttons = document.querySelectorAll(".categoria-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {

            const categoria = btn.dataset.categoria;

            // Toggle selezione
            if (categorieSelezionate.has(categoria)) {
                categorieSelezionate.delete(categoria);
                btn.classList.remove("attiva");
            } else {
                categorieSelezionate.add(categoria);
                btn.classList.add("attiva");
            }
        });
    });
}

// Funzione per ottenere le categorie attive
function getCategorieAttive() {
    return Array.from(categorieSelezionate);
}

export {
    setupCategoryButtons,
    getCategorieAttive
};

/* 
    Fine js/ui.js : Gestione pulsanti categoria
    Percorso completo: /js/ui.js
    Data: 13/04/2026 - Ore 07:12
*/
