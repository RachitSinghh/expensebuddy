// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore,collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSe7veRFOgioxqoJnhidPgwuZu_C5d6tk",
  authDomain: "expensebuddy-869a0.firebaseapp.com",
  projectId: "expensebuddy-869a0",
  storageBucket: "expensebuddy-869a0.appspot.com",
  messagingSenderId: "326455955890",
  appId: "1:326455955890:web:c922ab1a798f1a1183d4ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // this give the app object and we can use this app component to add authentication and 

// db services

export const db = getFirestore(app); // we need to use this to pass our app object so this will give us the reference of our database

export const auth = getAuth(app) // provide us with app authentication service form firebase


// reference to our collections we will have two collections trips and expense
// and the way we can use that is use a collection method from fireStore this will give us the refernce for our collections 
// and we can use them later in our application

export const tripsRef = collection(db, 'trips') //db object and ref name
export const expenseRef = collection(db, 'expenses') //db object and ref name


export default app;