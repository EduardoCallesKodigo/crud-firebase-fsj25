import { initializeApp } from "firebase/app";

// Importamos el metodo getFirestore para poder conectar a la base de datos
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3TW_BnVvgCoJZAYv1IxdKkfXnV7zUgVY",
  authDomain: "crud-firebase-fsj25.firebaseapp.com",
  projectId: "crud-firebase-fsj25",
  storageBucket: "crud-firebase-fsj25.appspot.com",
  messagingSenderId: "465184112553",
  appId: "1:465184112553:web:704e7560ea41af16834eb8"
};

const app = initializeApp(firebaseConfig);

// Exportamos db para tener acceso a nuestras tablas(collections)
export const db = getFirestore(app)