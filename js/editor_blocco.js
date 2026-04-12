// ============================================================
//  IMPORT FIREBASE (Realtime Database)
// ============================================================
import { 
    getDatabase, ref, set, get 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

import { app } from "./firebase.js"; // se hai firebase.js separato

const db = getDatabase(app);

// ============================================================
//  ELEMENTI DOM
// ============================================================
const inputNome = document.getElementById("nomeBlocco");
const inputCategoria = document.getElementById("categoriaBlocco");
const listaLibrerie = document.getElementById("listaLibrerie");
const listaVariabili = document.getElementById("listaVariabili");

const codiceDich = document.getElementById("codiceDich");
const codiceSetup = document.getElementById("codiceSetup");
const codiceLoop = document.getElementById("codiceLoop");

const btnSalva = document.getElementById("btnSalva");
const btnAnnulla = document.getElementById("btnAnnulla");

// ============================================================
//  OTTIENI PARAMETRI URL
// ============================================================
const url = new URL(window.location.href);
const id = url.searchParams.get("id");
const isNew = url.searchParams.get("new") === "1";

// ============================================================
//  CARICA BLOCCO SE ESISTE
// ============================================================
if (!isNew && id) {
    caricaBlocco(id);
}

async function caricaBlocco(id) {
    const snapshot = await get(ref(db, "blocchi/" + id));

    if (!snapshot.exists()) {
        alert("Blocco non trovato");
        return;
    }

    const b = snapshot.val();

    inputNome.value = b.nome;
    inputCategoria.value = b.categoria;

    codiceDich.value = b.codiceDich || "";
    codiceSetup.value = b.codiceSetup || "";
    codiceLoop.value = b.codiceLoop || "";

    // Librerie
    listaLibrerie.innerHTML = "";
    (b.librerie || []).forEach(lib => aggiungiLibreria(lib));

    // Variabili
    listaVariabili.innerHTML = "";
    (b.variabili || []).forEach(v => aggiungiVariabile(v.nome, v.tipo));
}

// ============================================================
//  AGGIUNGI LIBRERIA
// ============================================================
document.getElementById("btnAddLib").onclick = () => aggiungiLibreria("");

function aggiungiLibreria(valore) {
    const div = document.createElement("div");
    div.className = "rigaLibreria";

    div.innerHTML = `
        <input class="inputVar" value="${valore}">
        <button class="btnDelete">🗑</button>
    `;

    div.querySelector(".btnDelete").onclick = () => div.remove();
    listaLibrerie.appendChild(div);
}

// ============================================================
//  AGGIUNGI VARIABILE
// ============================================================
document.getElementById("btnAddVar").onclick = () => aggiungiVariabile("", "int");

function aggiungiVariabile(nome, tipo) {
    const div = document.createElement("div");
    div.className = "rigaVariabile";

    div.innerHTML = `
        <input class="inputVar" placeholder="Nome variabile" value="${nome}">
        <select class="selectVar">
            <option value="int" ${tipo === "int" ? "selected" : ""}>int</option>
            <option value="float" ${tipo === "float" ? "selected" : ""}>float</option>
            <option value="bool" ${tipo === "bool" ? "selected" : ""}>bool</option>
            <option value="String" ${tipo === "String" ? "selected" : ""}>String</option>
        </select>
        <button class="btnDelete">🗑</button>
    `;

    div.querySelector(".btnDelete").onclick = () => div.remove();
    listaVariabili.appendChild(div);
}

// ============================================================
//  SALVA BLOCCO
// ============================================================
btnSalva.onclick = async () => {
    const nome = inputNome.value.trim();
    if (nome === "") {
        alert("Inserisci un nome per il blocco");
        return;
    }

    const id = nome.replace(/\s+/g, "_");

    const blocco = {
        nome: nome,
        categoria: inputCategoria.value,
        codiceDich: codiceDich.value,
        codiceSetup: codiceSetup.value,
        codiceLoop: codiceLoop.value,
        librerie: [],
        variabili: []
    };

    // Librerie
    listaLibrerie.querySelectorAll(".rigaLibreria").forEach(div => {
        const val = div.querySelector("input").value.trim();
        if (val !== "") blocco.librerie.push(val);
    });

    // Variabili
    listaVariabili.querySelectorAll(".rigaVariabile").forEach(div => {
        const nomeVar = div.querySelector("input").value.trim();
        const tipoVar = div.querySelector("select").value;
        if (nomeVar !== "") blocco.variabili.push({ nome: nomeVar, tipo: tipoVar });
    });

    await set(ref(db, "blocchi/" + id), blocco);

    alert("Blocco salvato!");
    window.location.href = "blocchi.html";
};

// ============================================================
//  ANNULLA
// ============================================================
btnAnnulla.onclick = () => {
    window.location.href = "blocchi.html";
};
