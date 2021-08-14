import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyApTU-Hb53RQ8aUw9AmmfTzUfxb-zBCe0w",
    authDomain: "minimalwork-5a54a.firebaseapp.com",
    projectId: "minimalwork-5a54a",
    storageBucket: "minimalwork-5a54a.appspot.com",
    messagingSenderId: "70630529426",
    appId: "1:70630529426:web:4e2e6b11689c52548b094b"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Database
const database = firebase.database();

export {firebase, database};
