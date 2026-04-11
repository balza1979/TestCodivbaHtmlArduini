// ============================================================
//  IMPORT DA FIREBASE.JS
// ============================================================
import { db, ref, get, child } from "./firebase.js";

// ============================================================
//  CHIP PREDEFINITI
// ============================================================
const CHIP_TIPI = {
    variabile: { nome: "Variabile", colore: "#0074D9", desc: "Dichiarazione variabile" },
    costante: { nome: "Costante", colore: "#2ECC40", desc: "Valore fisso" },
    array: { nome: "Array", colore: "#FF851B", desc: "Lista di valori" },
    stringa: { nome: "Stringa", colore: "#B10DC9", desc: "Testo" },
    booleano: { nome: "Booleano", colore: "#85144b", desc: "Vero/Falso" },
    libreria: { nome: "Libreria", colore: "#3D9970", desc: "Include libreria" },
    configurazione: { nome: "Config", colore: "#AAAAAA", desc: "Impostazioni" },
    altro: { nome: "Altro", colore: "#111111", desc: "Generico" },

    in: { nome: "Input", colore: "#0074D9", desc: "pinMode INPUT" },
    out: { nome: "Output", colore: "#FF4136", desc: "pinMode OUTPUT" },
    pwm: { nome: "PWM", colore: "#FF851B", desc: "Output PWM" },
    analog_in: { nome: "Analog In", colore: "#2ECC40", desc: "Lettura analogica" },
    analog_out: { nome: "Analog Out", colore: "#B10DC9", desc: "Scrittura analogica" },
    tempo: { nome: "Tempo", colore: "#AAAAAA", desc: "Delay, millis" },
    timer: { nome: "Timer", colore: "#85144b", desc: "Gestione timer" },
    seriale: { nome: "Seriale", colore: "#3D9970", desc: "Serial.begin" },
    inizializzazione: { nome: "Init", colore: "#111111", desc: "Setup iniziale" },

    sensore: { nome: "Sensore", colore: "#0074D9", desc: "Lettura sensori" },
    attuatore: { nome: "Attuatore", colore: "#FF4136", desc: "Comando attuatori" },
    controllo: { nome: "Controllo", colore: "#2ECC40", desc: "If, logica" },
    debug: { nome: "Debug", colore: "#AAAAAA", desc: "Serial.print" },
    logica: { nome: "Logica", colore: "#85144b", desc: "Operazioni logiche" },

    funzione: { nome: "Funzione", colore: "#0074D9", desc: "Definizione funzione" },
    utilita: { nome: "Utilità", colore: "#FF851B", desc: "Blocchi utili" }
};

const TIPI_SEZIONI = {
    dich: ["variabile","costante","array","stringa","booleano","libreria","configurazione","altro"],
    setup: ["in","out","pwm","analog_in","analog_out","tempo","timer","seriale","inizializzazione","altro"],
    loop: ["sensore","attuatore","controllo","tempo","debug","logica","altro"],
    func: ["funzione","utilita","sensore","attuatore","controllo","altro"]
};

// ============================================================
//  POPUP INFO
// ============================================================
export function showInfo(msg) {
    document.getElementById("popupInfoText").textContent = msg;
    document.getElementById("popupInfo").style.display = "flex";
}

export function hideInfo() {
    document.getElementById("popupInfo").style.display = "none";
}

// ============================================================
//  CARICA CAPITOLI DA FIREBASE
// ============================================================
export async function caricaCapitoli() {
    showInfo("Caricamento dati...");
    try {
        const snap = await get(child(ref(db), "capitoli/arduino"));
        window._blocchiArduino = snap.exists() ? snap.val() : {};
        hideInfo();
        setFiltriEnabled(true);
    } catch (e) {
        showInfo("Errore caricamento dati");
        console.error(e);
    }
}

// ============================================================
//  ABILITA / DISABILITA FILTRI
// ============================================================
function setFiltriEnabled(enabled) {
    ["btnDich","btnSetup","btnLoop","btnFunc"].forEach(id => {
        const btn = document.getElementById(id);
        if (enabled) btn.classList.remove("disabled");
        else btn.classList.add("disabled");
    });
}

// ============================================================
//  LISTENER ANDROID ROBUSTO
// ============================================================
let ultimoModello = "";
const sel = document.getElementById("selectModello");

["change","input","click","touchstart","focusout"].forEach(ev => {
    sel.addEventListener(ev, () => {
        const modello = sel.value;
        if (modello && modello !== ultimoModello) {
            ultimoModello = modello;
            caricaCapitoli();
        }
    });
});

// ============================================================
//  APPLICA FILTRO
// ============================================================
export function applicaFiltro(sezione) {
    const panel = document.getElementById("panel" + capitalize(sezione));
    const select = document.getElementById("select" + capitalize(sezione));

    const attivi = [...panel.querySelectorAll(".chip.active")]
        .map(c => c.dataset.tipo);

    select.innerHTML = "";
    let trovati = 0;

    Object.values(window._blocchiArduino || {}).forEach(b => {
        if (attivi.includes(b.tipo)) {
            trovati++;
            const opt = document.createElement("option");
            opt.value = JSON.stringify(b);
            opt.textContent = b.nome;
            select.appendChild(opt);
        }
    });

    if (trovati === 0) {
        showInfo("Nessun blocco trovato");
        setTimeout(hideInfo, 1500);
        return;
    }

    panel.style.display = "none";
}

// ============================================================
//  UTILITY
// ============================================================
function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

// ============================================================
//  FUNZIONI GLOBALI
// ============================================================
window.nuovoProgetto = () => showInfo("Funzione nuovo progetto in arrivo");
window.salvaProgetto = () => showInfo("Funzione salvataggio in arrivo");
window.generaFile = () => showInfo("Funzione generazione file in arrivo");
