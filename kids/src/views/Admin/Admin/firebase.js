import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAx2GXhbjif_lMn75DD2tpid3laKMqOfMw",
    authDomain: "fypmobileapp-4872a.firebaseapp.com",
    databaseURL: "https://fypmobileapp-4872a-default-rtdb.firebaseio.com",
    projectId: "fypmobileapp-4872a",
    storageBucket: "fypmobileapp-4872a.appspot.com",
    messagingSenderId: "1094790812693",
    appId: "1:1094790812693:web:724360601a959097752a1c",
    measurementId: "G-QKDGJ0GDBG"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); 
 }
  export default firebase;