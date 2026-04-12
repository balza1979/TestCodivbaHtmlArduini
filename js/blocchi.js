document.addEventListener("DOMContentLoaded", () => {

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
