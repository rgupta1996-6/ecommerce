import firebase from 'firebase';

  const  firebaseConfig = {
    apiKey: "AIzaSyBHwnfUePjmGudBgbXl-k_3XeOi4r0Wy6E",
    authDomain: "ecommerce-a430d.firebaseapp.com",
    projectId: "ecommerce-a430d",
    storageBucket: "ecommerce-a430d.appspot.com",
    messagingSenderId: "354421716341",
    appId: "1:354421716341:web:fd3d2e5829d5466f6e4f3c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
