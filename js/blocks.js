/* 
    js/blocks.js : core - Definizione blocchi Arduino
    Percorso completo: /js/blocks.js
    Data: 13/04/2026 - Ore 00:26
    Descrizione:
    Struttura dati completa dei blocchi Arduino.
    Ogni blocco contiene:
    - id univoco
    - nome leggibile
    - alias (nomi alternativi per la ricerca)
    - categoria
    - icona
    - tag
    - descrizione
    - librerie richieste
    - variabili richieste
    - template codice

    Nessuna logica qui dentro.
    La logica è in /js/logic.js.
*/

const BLOCKS = [

    // ============================================================
    // 1) DIGITAL WRITE
    // ============================================================
    {
        id: "digitalWrite",
        nome: "Digital Write",
        alias: ["digitalwrite", "scrivi digitale", "uscita digitale", "led", "on", "off"],
        categoria: "digitali",
        icona: "🔢",

        tag: ["digital", "uscita", "pin", "led", "on", "off"],

        descrizione: "Imposta un pin digitale su HIGH o LOW.",

        librerie: [],

        variabili: [
            { nome: "pin", tipo: "numero" },
            { nome: "stato", tipo: "boolean" }
        ],

        codice: (v) => `digitalWrite(${v.pin}, ${v.stato});`
    },

    // ============================================================
    // 2) DIGITAL READ
    // ============================================================
    {
        id: "digitalRead",
        nome: "Digital Read",
        alias: ["digitalread", "leggi digitale", "pulsante", "bottone", "switch", "input"],
        categoria: "digitali",
        icona: "🔢",

        tag: ["digital", "ingresso", "pin", "pulsante", "input"],

        descrizione: "Legge lo stato di un pin digitale (HIGH/LOW).",

        librerie: [],

        variabili: [
            { nome: "pin", tipo: "numero" },
            { nome: "variabile", tipo: "stringa" }
        ],

        codice: (v) => `${v.variabile} = digitalRead(${v.pin});`
    },

    // ============================================================
    // 3) ANALOG READ
    // ============================================================
    {
        id: "analogRead",
        nome: "Analog Read",
        alias: ["analogread", "leggi analogico", "sensore analogico", "potenziometro"],
        categoria: "analogici",
        icona: "📈",

        tag: ["analog", "ingresso", "pin", "sensore", "potenziometro"],

        descrizione: "Legge un valore analogico da un pin (0-1023).",

        librerie: [],

        variabili: [
            { nome: "pin", tipo: "numero" },
            { nome: "variabile", tipo: "stringa" }
        ],

        codice: (v) => `${v.variabile} = analogRead(${v.pin});`
    },

    // ============================================================
    // 4) SERVO WRITE
    // ============================================================
    {
        id: "servoWrite",
        nome: "Servo - Imposta Angolo",
        alias: ["servo", "servo write", "servo angolo", "motore servo"],
        categoria: "attuatori",
        icona: "⚡",

        tag: ["servo", "motore", "angolo", "attuatore"],

        descrizione: "Imposta l'angolo di un servo motore.",

        librerie: ["Servo.h"],

        variabili: [
            { nome: "variabileServo", tipo: "stringa" },
            { nome: "pin", tipo: "numero" },
            { nome: "angolo", tipo: "numero" }
        ],

        codice: (v) =>
`Servo ${v.variabileServo};
${v.variabileServo}.attach(${v.pin});
${v.variabileServo}.write(${v.angolo});`
    }

    // Qui aggiungeremo TUTTI gli altri blocchi
];

/* 
    Fine js/blocks.js : core - Definizione blocchi Arduino
    Percorso completo: /js/blocks.js
    Data: 13/04/2026 - Ore 00:26
*/
