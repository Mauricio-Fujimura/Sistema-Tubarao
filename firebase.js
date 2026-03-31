import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDYUDkX8_vCfmHLtRX7-5APxDn5x7RMx6A",
  authDomain: "sistematubarao.firebaseapp.com",
  projectId: "sistematubarao",
  storageBucket: "sistematubarao.firebasestorage.app",
  messagingSenderId: "184743672757",
  appId: "1:184743672757:web:f146ffe0266f42c75237fc",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
