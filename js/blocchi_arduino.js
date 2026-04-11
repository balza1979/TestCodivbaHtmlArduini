// ============================================================
//  IMPORT FIREBASE
// ============================================================
import { db, ref, get, set, remove, child } from "./firebase.js";

// ============================================================
//  CATEGORIE UNIVOCHE (USATE ANCHE NELL’EDITOR)
// ============================================================
const CATEGORIE = [
    "dichiarazione",
    "setup",
    "loop",
    "funzione",
    "input",
    "output",
    "pwm",
    "analog",
    "logica",
    "tempo",
    "comunicazione",
    "altro"
];

// ============================================================
//  ELEMENTI DOM
// ============================================================
const listaBlocchi = document.getElementById("listaBlocchi");
const chipCategorie = document.getElementById("chipCategorie");

const popup = document.getElementById("popupBlocco");
const popupTitolo = document.getElementById("popupTitolo");

const inpNome = document.getElementById("bloccoNome");
const inpCategoria = document.getElementById("bloccoCategoria");
const inpDescrizione = document.getElementById("bloccoDescrizione");
const inpCodice = document.getElementById("bloccoCodice");

const btnSalva = document.getElementById("btnSalvaBlocco");

let bloccoCorrente = null; // per modifica

// ============================================================
//  GENERA CHIP CATEGORIE
// ============================================================
function generaChipCategorie() {
    chipCategorie.innerHTML = "";

    CATEGORIE.forEach(cat => {
        const chip = document.createElement("div");
        chip.className = "chip";
        chip.textContent = cat;
        chip.dataset.cat = cat;

        chip.onclick = () => {
            document.querySelectorAll("#chipCategorie .chip")
                .forEach(c => c.classList.remove("active"));
            chip.classList.add("active");
            filtraBlocchi(cat);
        };

        chipCategorie.appendChild(chip);
    });
}

generaChipCategorie();

// ============================================================
//  CARICA BLOCCHI DA FIREBASE
// ============================================================
export async function caricaBlocchi() {
    listaBlocchi.innerHTML = "Caricamento...";

    const snap = await get(child(ref(db), "blocchiArduino"));
    if (!snap.exists()) {
        listaBlocchi.innerHTML = "Nessun blocco presente";
        return;
    }

    const dati = snap.val();
    window._blocchiArduino = dati; // utile anche per l’editor

    mostraBlocchi(Object.values(dati));
}

caricaBlocchi();

// ============================================================
//  MOSTRA BLOCCHI
// ============================================================
function mostraBlocchi(lista) {
    listaBlocchi.innerHTML = "";

    lista.forEach(b => {
        const card = document.createElement("div");
        card.className = "chip";
        card.style.background = "#333";
        card.style.border = "4px solid white";
        card.style.width = "100%";
        card.style.padding = "25px";

        card.innerHTML = `
            <div style="font-size:50px; font-weight:bold;">${b.nome}</div>
            <div style="font-size:35px; margin-top:10px;">Categoria: ${b.categoria}</div>
            <div style="font-size:30px; margin-top:10px; opacity:0.8;">${b.descrizione}</div>

            <button class="popupBtn" style="margin-top:20px;" onclick="modificaBlocco('${b.id}')">✏️ Modifica</button>
            <button class="popupClose" style="margin-top:10px;" onclick="eliminaBlocco('${b.id}')">🗑 Elimina</button>
        `;

        listaBlocchi.appendChild(card);
    });
}

// ============================================================
//  FILTRA BLOCCHI
// ============================================================
function filtraBlocchi(cat) {
    const tutti = Object.values(window._blocchiArduino || {});
    const filtrati = tutti.filter(b => b.categoria === cat);
    mostraBlocchi(filtrati);
}

// ============================================================
//  APRI POPUP NUOVO BLOCCO
// ============================================================
window.apriPopupNuovoBlocco = () => {
    bloccoCorrente = null;
    popupTitolo.textContent = "Nuovo Blocco";

    inpNome.value = "";
    inpCategoria.value = "";
    inpDescrizione.value = "";
    inpCodice.value = "";

    popup.style.display = "flex";
};

// ============================================================
//  CHIUDI POPUP
// ============================================================
window.chiudiPopupBlocco = () => {
    popup.style.display = "none";
};

// ============================================================
//  MODIFICA BLOCCO
// ============================================================
window.modificaBlocco = (id) => {
    const b = window._blocchiArduino[id];
    if (!b) return;

    bloccoCorrente = id;
    popupTitolo.textContent = "Modifica Blocco";

    inpNome.value = b.nome;
    inpCategoria.value = b.categoria;
    inpDescrizione.value = b.descrizione;
    inpCodice.value = b.codice;

    popup.style.display = "flex";
};

// ============================================================
//  ELIMINA BLOCCO
// ============================================================
window.eliminaBlocco = async (id) => {
    await remove(ref(db, "blocchiArduino/" + id));
    caricaBlocchi();
};

// ============================================================
//  SALVA BLOCCO (NUOVO O MODIFICA)
// ============================================================
btnSalva.onclick = async () => {
    const nome = inpNome.value.trim();
    const categoria = inpCategoria.value.trim();
    const descrizione = inpDescrizione.value.trim();
    const codice = inpCodice.value.trim();

    if (!nome || !categoria || !codice) {
        alert("Nome, categoria e codice sono obbligatori");
        return;
    }

    const id = bloccoCorrente || Date.now().toString();

    const blocco = {
        id,
        nome,
        categoria,
        descrizione,
        codice
    };

    await set(ref(db, "blocchiArduino/" + id), blocco);

    popup.style.display = "none";
    caricaBlocchi();
};
