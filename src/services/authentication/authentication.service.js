import { initializeApp } from "firebase/app";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyBm4Rm2K3UOLrgg9FWvftmVxi7ylnS8IhA",
	authDomain: "mealstogo-e7267.firebaseapp.com",
	projectId: "mealstogo-e7267",
	storageBucket: "mealstogo-e7267.firebasestorage.app",
	messagingSenderId: "518072103143",
	appId: "1:518072103143:web:85b57c296da5c29fe77242",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const loginRequest = (email, password) => {
	return signInWithEmailAndPassword(auth, email, password);
};
