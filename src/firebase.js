import firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBPU1YA73FOTGFh7dwAiDaCqoNSxyHOmm8",
    authDomain: "proyectosena-e6d2a.firebaseapp.com",
    databaseURL: "https://proyectosena-e6d2a.firebaseio.com",
    projectId: "proyectosena-e6d2a",
    storageBucket: "proyectosena-e6d2a.appspot.com",
    messagingSenderId: "405260404862",
    appId: "1:405260404862:web:2f4a148c3500806b53702f",
    measurementId: "G-TDTJHSQ504"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

    export const db = fb.firestore();

