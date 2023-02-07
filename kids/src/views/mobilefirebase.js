

import firebase from "firebase/app"
import "firebase/firestore"

export const firebaseConfig = {
    apiKey: "AIzaSyDz5Xkem8mbLgHhmTgBnfJzPMWVOa4ioPk",
    authDomain: "abid-6cb93.firebaseapp.com",
    databaseURL: "https://abid-6cb93-default-rtdb.firebaseio.com",                         
    projectId: "abid-6cb93",
    storageBucket: "abid-6cb93.appspot.com",
    messagingSenderId: "804616955282",
    appId: "1:804616955282:web:cc1fe1ee6693e08e604d4b",
    measurementId: "G-L9J0SRSVTE"
  };

  
var firebaseMobile = firebase.initializeApp(firebaseConfig,"mobiledb");

export default firebaseMobile;