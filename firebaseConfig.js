// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 
    {getAuth,
    initializeAuth,
    getReactNativePersistence,
} from "firebase/auth";
import { getDatabase } from 'firebase/database';
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCHhAsIlu8rc7IvOwVTLFI7lofY5cfJBBc",
  authDomain: "hciappdevtestdatabase.firebaseapp.com",
  projectId: "hciappdevtestdatabase",
  storageBucket: "hciappdevtestdatabase.firebasestorage.app",
  messagingSenderId: "708356211262",
  appId: "1:708356211262:web:0e41b06cb3d4e48408076f",
  measurementId: "G-NC8C65DQXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
const database = getDatabase(app);
  
  export { app, auth, database };