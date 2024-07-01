import { FIREBASE_DATA } from "@/constants/firebaseData";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = FIREBASE_DATA;

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
