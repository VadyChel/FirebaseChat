import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Config from "../config";
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, onAuthStateChanged, signInWithCredential, getAuth, getIdTokenResult} from "firebase/auth";
import "@mdi/font/css/materialdesignicons.css";
import "./assets/main.css"

const firebaseConfig = Config;
initializeApp(firebaseConfig);

const auth = getAuth()
let app;
onAuthStateChanged(auth, async (user) => {
  if (!app) {
    app = createApp(App).use(store).use(router).mount("#app");
  }

  const credential = GoogleAuthProvider.credential(await getIdTokenResult(user).token);
  await signInWithCredential(credential);
})