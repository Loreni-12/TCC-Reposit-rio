import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore/lite";

// Inicialização única do Firebase. Somente src/services/ deve importar este módulo.
const env = import.meta.env;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

const ausentes = Object.entries(firebaseConfig)
  .filter(([, valor]) => !valor)
  .map(([chave]) => chave);
if (ausentes.length > 0) {
  throw new Error(
    `Configuração do Firebase incompleta (${ausentes.join(", ")}). Copie .env.example para .env.local e preencha.`,
  );
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Em desenvolvimento, usa os emuladores locais (npm run emulators) em vez do projeto real.
if (env.DEV && env.VITE_USE_EMULATORS === "true") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
}
