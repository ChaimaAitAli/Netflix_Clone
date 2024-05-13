import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpG20zK_ohmvWlGApGCYCEb4M6CdVQfIA",
  authDomain: "netflix-clone-tuto-3d0bb.firebaseapp.com",
  projectId: "netflix-clone-tuto-3d0bb",
  storageBucket: "netflix-clone-tuto-3d0bb.appspot.com",
  messagingSenderId: "369608830430",
  appId: "1:369608830430:web:0cfde408e476420339014f",
  measurementId: "G-MTMH1QLCJM"
};


const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);