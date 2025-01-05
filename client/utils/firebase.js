// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider, signInWithPopup } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MES,
};


// const firebaseConfig = {
//   apiKey: "AIzaSyA-eoVOERffFhRap8wXOzHfmzNtX6O1_8w",
//   authDomain: "picwebsite-f72d2.firebaseapp.com",
//   projectId: "picwebsite-f72d2",
//   storageBucket: "picwebsite-f72d2.firebasestorage.app",
//   messagingSenderId: "546937015925",
//   appId: "1:546937015925:web:a7070bdf4107eab3c0b23c",
//   measurementId: "G-SYGG5CF4VF"
// };


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();
 
export default async function googleAuth() {
  try {
    let data = await signInWithPopup(auth, provider);
    return data.user;
  } catch (error) {
    console.log(error);
  }
}

