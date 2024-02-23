// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQlm7_DCKLDnigsjGuvn00vCVagdYRSZ0",
  authDomain: "testworkshop-a037a.firebaseapp.com",
  databaseURL: "https://testworkshop-a037a-default-rtdb.firebaseio.com",
  projectId: "testworkshop-a037a",
  storageBucket: "testworkshop-a037a.appspot.com",
  messagingSenderId: "730274288477",
  appId: "1:730274288477:web:32bd742011ba43c0e8ceb4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// reference to the database
const database = getDatabase();

// referencing to our messages object in the database
// This is for the real-time changes
const messages = ref(database, '/messages');

// take a snapshot of the changes and store it in the variable to be added to the screen
onValue(messages, (snapshot) => {
    console.log(snapshot);

    const ul = document.getElementById("messages");
    ul.replaceChildren();

    snapshot.forEach(childSnapshot => {
        console.log(childSnapshot.key);
        console.log(childSnapshot.val());

        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();

        const text = document.createTextNode(childData.message);
        const li = document.createElement('li');

        li.appendChild(text);
        ul.appendChild(li);
    });
}, {
    // will rerun if an update happens
    onlyOnce: false,
})
