import firebase from 'firebase/app';
import 'firebase/auth'
import { onMount } from "svelte";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcQ8U9QmlK-Kdb94SPW1qdP8Kqu829GhE",
  authDomain: "seniorprojectokhackers.firebaseapp.com",
  databaseURL: "https://seniorprojectokhackers-default-rtdb.firebaseio.com",
  projectId: "seniorprojectokhackers",
  storageBucket: "seniorprojectokhackers.appspot.com",
  messagingSenderId: "102482778593",
  appId: "1:102482778593:web:e77c7482eaeb592884daa0",
  measurementId: "G-194TR6QGXY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

