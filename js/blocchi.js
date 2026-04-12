document.addEventListener("DOMContentLoaded", () => {
    console.log("blocchi.js è attivo");

    document.querySelectorAll(".btn-edit").forEach(btn => {
        btn.addEventListener("click", () => {
            console.log("Modifica blocco");
        });
    });

    document.querySelectorAll(".btn-duplicate").forEach(btn => {
        btn.addEventListener("click", () => {
            console.log("Duplica blocco");
        });
    });

    document.querySelectorAll(".btn-delete").forEach(btn => {
        btn.addEventListener("click", () => {
            console.log("Elimina blocco");
        });
    });

});
