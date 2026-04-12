
// ===============================
//  EDITOR BLOCCHI - JAVASCRIPT
// ===============================

// Riferimenti agli elementi HTML
const nomeInput = document.getElementById("bloccoNome");
const categoriaInput = document.getElementById("bloccoCategoria");

const listaLibrerie = document.getElementById("listaLibrerie");
const btnAggiungiLibreria = document.getElementById("btnAggiungiLibreria");

const listaVariabili = document.getElementById("listaVariabili");
const btnAggiungiVariabile = document.getElementById("btnAggiungiVariabile");

const codiceDichiarazioni = document.getElementById("codiceDichiarazioni");
const codiceSetup = document.getElementById("codiceSetup");
const codiceLoop = document.getElementById("codiceLoop");
const codiceFunzioni = document.getElementById("codiceFunzioni");

const btnSalva = document.getElementById("btnSalvaBlocco");
const btnAnnulla = document.getElementById("btnAnnullaBlocco");


// ===============================
//  TIPI DI VARIABILI DISPONIBILI
// ===============================

const tipiVariabili = [
    "string",
    "numero",
    "pin",
    "pin_pwm",
    "pin_analog",
    "pulsante",
    "uscita",
    "servo",
    "ultrasuoni",
    "stepper",
    "strip",
    "colore",
    "boolean",
    "libreria",
    "esp32_pin",
    "esp32_wifi_mode",
    "esp32_bt_device",
    "html_page"
];


// ===============================
//  FUNZIONE: CREA UNA RIGA LIBRERIA
// ===============================

function creaRigaLibreria(valore = "") {
    const div = document.createElement("div");
    div.className = "rigaLibreria";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "inputBig";
    input.value = valore;

    const btnX = document.createElement("button");
    btnX.className = "btnDelete";
    btnX.textContent = "X";
    btnX.onclick = () => div.remove();

    div.appendChild(input);
    div.appendChild(btnX);

    listaLibrerie.appendChild(div);
}


// ===============================
//  FUNZIONE: CREA UNA RIGA VARIABILE
// ===============================

function creaRigaVariabile(nome = "", tipo = "string") {
    const div = document.createElement("div");
    div.className = "rigaVariabile";

    // Nome variabile
    const inputNome = document.createElement("input");
    inputNome.type = "text";
    inputNome.className = "inputVar";
    inputNome.placeholder = "nomeVariabile";
    inputNome.value = nome;

    // Dropdown tipo variabile
    const selectTipo = document.createElement("select");
    selectTipo.className = "selectVar";

    tipiVariabili.forEach(t => {
        const opt = document.createElement("option");
        opt.value = t;
        opt.textContent = t;
        if (t === tipo) opt.selected = true;
        selectTipo.appendChild(opt);
    });

    // Bottone elimina
    const btnX = document.createElement("button");
    btnX.className = "btnDelete";
    btnX.textContent = "X";
    btnX.onclick = () => div.remove();

    div.appendChild(inputNome);
    div.appendChild(selectTipo);
    div.appendChild(btnX);

    listaVariabili.appendChild(div);
}


// ===============================
//  AGGIUNTA LIBRERIA
// ===============================

btnAggiungiLibreria.onclick = () => {
    creaRigaLibreria("");
};


// ===============================
//  AGGIUNTA VARIABILE
// ===============================

btnAggiungiVariabile.onclick = () => {
    creaRigaVariabile("", "string");
};


// ===============================
//  SALVATAGGIO BLOCCO
// ===============================

btnSalva.onclick = async () => {

    const nome = nomeInput.value.trim();
    if (!nome) {
        alert("Inserisci un nome per il blocco");
        return;
    }

    const categoria = categoriaInput.value;

    // --- LIBRERIE ---
    const librerie = [];
    listaLibrerie.querySelectorAll(".rigaLibreria input").forEach(input => {
        if (input.value.trim() !== "") librerie.push(input.value.trim());
    });

    // --- VARIABILI ---
    const variabili = [];
    listaVariabili.querySelectorAll(".rigaVariabile").forEach(div => {
        const nomeVar = div.querySelector("input").value.trim();
        const tipoVar = div.querySelector("select").value;

        if (nomeVar !== "") {
            variabili.push({
                nome: nomeVar,
                tipo: tipoVar
            });
        }
    });

    // --- CODICE ---
    const codice = {
        dichiarazioni: codiceDichiarazioni.value,
        setup: codiceSetup.value,
        loop: codiceLoop.value,
        funzioni: codiceFunzioni.value
    };

    // --- JSON FINALE ---
    const blocco = {
        nome,
        categoria,
        librerie,
        variabili,
        codice
    };

    // Salvataggio su Firebase
    try {
        await salvaBloccoFirebase(blocco);
        alert("Blocco salvato con successo!");
        window.location.href = "blocchi.html";
    } catch (e) {
        console.error(e);
        alert("Errore durante il salvataggio");
    }
};


// ===============================
//  ANNULLA
// ===============================

btnAnnulla.onclick = () => {
    window.location.href = "blocchi.html";
};


// ===============================
//  CARICAMENTO BLOCCO ESISTENTE
// ===============================

async function caricaBlocco() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) return; // nuovo blocco

    const blocco = await caricaBloccoFirebase(id);
    if (!blocco) return;

    document.getElementById("titoloEditorBlocco").textContent = "Modifica Blocco";

    nomeInput.value = blocco.nome;
    categoriaInput.value = blocco.categoria;

    // Librerie
    blocco.librerie.forEach(lib => creaRigaLibreria(lib));

    // Variabili
    blocco.variabili.forEach(v => creaRigaVariabile(v.nome, v.tipo));

    // Codice
    codiceDichiarazioni.value = blocco.codice.dichiarazioni;
    codiceSetup.value = blocco.codice.setup;
    codiceLoop.value = blocco.codice.loop;
    codiceFunzioni.value = blocco.codice.funzioni;
}

caricaBlocco();


// ===============================
//  FUNZIONI FIREBASE (DA IMPLEMENTARE)
// ===============================

async function salvaBloccoFirebase(blocco) {
    // Qui inserirai il codice Firebase reale
    console.log("SALVO BLOCCO:", blocco);
}

async function caricaBloccoFirebase(id) {
    // Qui inserirai il codice Firebase reale
    console.log("CARICO BLOCCO:", id);
    return null;
}
