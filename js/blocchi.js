document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".btn-edit").forEach(btn => {
        btn.addEventListener("click", () => {
            alert("Modifica blocco");
        });
    });

    document.querySelectorAll(".btn-duplicate").forEach(btn => {
        btn.addEventListener("click", () => {
            alert("Duplica blocco");
        });
    });

    document.querySelectorAll(".btn-delete").forEach(btn => {
        btn.addEventListener("click", () => {
            alert("Elimina blocco");
        });
    });

});
