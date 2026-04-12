// ============================================================
//  IMPORT FIREBASE (Realtime Database)
// ============================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get, child, remove } 
    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// Esporto tutto per editor_blocco.js e blocchi.js
export { ref, set, get, child, remove };
