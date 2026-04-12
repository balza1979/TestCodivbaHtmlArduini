// ===============================
//  BLOCCO: CARICAMENTO LISTA
// ===============================

const listaBlocchi = document.getElementById("listaBlocchi");
const searchInput = document.getElementById("searchInput");
const filtroCategoria = document.getElementById("filtroCategoria");
const btnNuovoBlocco = document.getElementById("btnNuovoBlocco");

let blocchi = []; // lista completa
let blocchiFiltrati = []; // lista filtrata


// ===============================
//  CARICA TUTTI I BLOCCHI DA FIREBASE
// ===============================

async function caricaBlocchi() {
    blocchi = await caricaTuttiBlocchi();
    blocchiFiltrati = blocchi;
    renderLista();
}

caricaBlocchi();


// ===============================
//  RENDER LISTA BLOCCHI
// ===============================

function renderLista() {
    listaBlocchi.innerHTML = "";

    if (blocchiFiltrati.length === 0) {
        listaBlocchi.innerHTML = "<p>Nessun blocco trovato.</p>";
        return;
    }

    blocchiFiltrati.forEach(b => {
        const card = document.createElement("div");
        card.className = "bloccoCard";

        card.innerHTML = `
            <h3>${b.nome}</h3>
            <p class="categoria">${b.categoria}</p>

            <div class="btnRow">
                <button class="btnSave" onclick="modificaBlocco('${b.nome}')">✏ Modifica</button>
                <button class="btnAdd" onclick="duplicaBlocco('${b.nome}')">📄 Duplica</button>
                <button class="btnDelete" onclick="eliminaBlocco('${b.nome}')">🗑 Elimina</button>
            </div>
        `;

        listaBlocchi.appendChild(card);
    });
}


// ===============================
//  FILTRO CATEGORIA
// ===============================

filtroCategoria.onchange = () => {
    filtra();
};


// ===============================
//  RICERCA
// ===============================

searchInput.oninput = () => {
    filtra();
};


// ===============================
//  FUNZIONE FILTRO COMPLETO
// ===============================

function filtra() {
    const testo = searchInput.value.toLowerCase();
    const cat = filtroCategoria.value;

    blocchiFiltrati = blocchi.filter(b => {
        const matchNome = b.nome.toLowerCase().includes(testo);
        const matchCat = (cat === "tutte" || b.categoria === cat);
        return matchNome && matchCat;
    });

    renderLista();
}


// ===============================
//  NUOVO BLOCCO
// ===============================

btnNuovoBlocco.onclick = () => {
    window.location.href = "editor_blocco.html?new=1";
};


// ===============================
//  MODIFICA BLOCCO
// ===============================

function modificaBlocco(nome) {
    const id = nome.replace(/\s+/g, "_");
    window.location.href = `editor_blocco.html?id=${id}`;
}


// ===============================
//  DUPLICA BLOCCO
// ===============================

async function duplicaBlocco(nome) {
    const id = nome.replace(/\s+/g, "_");
    const blocco = await caricaBloccoFirebase(id);

    if (!blocco) return;

    const nuovoNome = nome + "_copia";
    blocco.nome = nuovoNome;

    await salvaBloccoFirebase(blocco);

    alert("Blocco duplicato!");
    caricaBlocchi();
}


// ===============================
//  ELIMINA BLOCCO
// ===============================

async function eliminaBlocco(nome) {
    if (!confirm("Vuoi davvero eliminare questo blocco?")) return;

    const id = nome.replace(/\s+/g, "_");

    await db.collection("blocchi").doc(id).delete();

    alert("Blocco eliminato!");
    caricaBlocchi();
}
