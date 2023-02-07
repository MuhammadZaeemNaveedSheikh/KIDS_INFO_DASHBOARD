import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyDIaxsL82UzcBmmALB49r31nbw9u_ADj4Y",
  authDomain: "zaeemproject2.firebaseapp.com",
  databaseURL: "https://zaeemproject2-default-rtdb.firebaseio.com",
  projectId: "zaeemproject2",
  storageBucket: "zaeemproject2.appspot.com",
  messagingSenderId: "484781720664",
  appId: "1:484781720664:web:3e36cf4fb0890e8ea3362d",
  measurementId: "G-BZG74VTS9G"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase