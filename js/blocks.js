/* 
    js/blocks.js : core - Definizione blocchi Arduino
    Percorso completo: /js/blocks.js
    Data: 13/04/2026 - Ore 00:13
    Descrizione:
    File che contiene la struttura dati di tutti i blocchi disponibili.
    Nessuna logica, solo definizioni. Usato da logic.js per filtri, ricerca,
    librerie, variabili e generazione codice.
*/

const BLOCKS = [

    // ESEMPIO DI STRUTTURA BLOCCO (base, da espandere)
    {
        id: "digitalWrite",
        nome: "Digital Write",
        categoria: "digitali",
        icona: "🔢",

        // Tag per ricerca
        tag: ["digital", "uscita", "pin", "on", "off"],

        // Librerie richieste
        librerie: [],

        // Variabili richieste
        variabili: [
            { nome: "pin", tipo: "numero" },
            { nome: "stato", tipo: "boolean" }
        ],

        // Codice generato (template)
        codice: (v) => `digitalWrite(${v.pin}, ${v.stato});`
    }

    // Qui aggiungeremo TUTTI gli altri blocchi
];

/* 
    Fine js/blocks.js : core - Definizione blocchi Arduino
    Percorso completo: /js/blocks.js
    Data: 13/04/2026 - Ore 00:13
*/
