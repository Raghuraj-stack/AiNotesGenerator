
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "examnotesgenerator-3d2f3.firebaseapp.com",
  projectId: "examnotesgenerator-3d2f3",
  storageBucket: "examnotesgenerator-3d2f3.firebasestorage.app",
  messagingSenderId: "994188185544",
  appId: "1:994188185544:web:4e1ab53ca8ad63055dbafd"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider} 