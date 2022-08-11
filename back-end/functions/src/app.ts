import {initializeApp} from "firebase/app";
import {enviroment} from "./enviroments/enviroment";

export const app = initializeApp(enviroment.firebaseConfig);
