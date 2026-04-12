// ============================================================
//  IMPORT FIREBASE (Realtime Database)
// ============================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getDatabase, ref, set, get, child, remove 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// ============================================================
//  CONFIGURAZIONE FIREBASE
// ============================================================
const firebaseConfig = {
    apiKey: "AIzaSyB1_lem0tKd5SQeuD7xs8Dj3Ey77MUUhDY",
    authDomain: "programmazione-4d38e.firebaseapp.com",
    databaseURL: "https://programmazione-4d38e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "programmazione-4d38e",
    storageBucket: "programmazione-4d38e.appspot.com",
    messagingSenderId: "390860890072",
    appId: "1:390860890072:web:5199a3f3c80f5b95a5dcad"
};

// ============================================================
//  INIZIALIZZAZIONE
// ============================================================
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ============================================================
//  ELEMENTI DOM
// ============================================================
const listaBlocchi = document.getElementById("listaBlocchi");
const searchInput = document.getElementById("searchInput");
const filtroCategoria = document.getElementById("filtroCategoria");
const btnNuovoBlocco = document.getElementById("btnNuovoBlocco");

let blocchi = [];
let blocchiFiltrati = [];

// ============================================================
//  CARICA TUTTI I BLOCCHI
// ============================================================
async function caricaTuttiBlocchi() {
    const snapshot = await get(ref(db, "blocchi"));
    if (!snapshot.exists()) return [];
    const data = snapshot.val();
    return Object.values(data);
}

async function caricaBlocchi() {
    blocchi = await caricaTuttiBlocchi();
    blocchiFiltrati = blocchi;
    renderLista();
}

caricaBlocchi();

// ============================================================
//  RENDER LISTA
// ============================================================
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

// ============================================================
//  FILTRO + RICERCA
// ============================================================
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

searchInput.oninput = filtra;
filtroCategoria.onchange = filtra;

// ============================================================
//  NUOVO BLOCCO
// ============================================================
btnNuovoBlocco.onclick = () => {
    window.location.href = "editor_blocco.html?new=1";
};

// ============================================================
//  MODIFICA BLOCCO
// ============================================================
function modificaBlocco(nome) {
    const id = nome.replace(/\s+/g, "_");
    window.location.href = `editor_blocco.html?id=${id}`;
}

// ============================================================
//  DUPLICA BLOCCO
// ============================================================
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

// ============================================================
//  ELIMINA BLOCCO (Realtime Database CORRETTO)
// ============================================================
async function eliminaBlocco(nome) {
    if (!confirm("Vuoi davvero eliminare questo blocco?")) return;

    const id = nome.replace(/\s+/g, "_");

    await remove(ref(db, "blocchi/" + id));

    alert("Blocco eliminato!");
    caricaBlocchi();
}

// ============================================================
//  FUNZIONI FIREBASE
// ============================================================
async function salvaBloccoFirebase(blocco) {
    const id = blocco.nome.replace(/\s+/g, "_");
    await set(ref(db, "blocchi/" + id), blocco);
}

async function caricaBloccoFirebase(id) {
    const snapshot = await get(ref(db, "blocchi/" + id));
    return snapshot.exists() ? snapshot.val() : null;
}
