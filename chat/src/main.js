import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { initializeApp } from "firebase/app";
import "@mdi/font/css/materialdesignicons.css";

const firebaseConfig = {
  apiKey: "AIzaSyAxiZXriKMSuvpPUaKtgoydDN0ubcFC2So",
  authDomain: "vvfirebasechat.firebaseapp.com",
  projectId: "vvfirebasechat",
  storageBucket: "vvfirebasechat.appspot.com",
  messagingSenderId: "604146670792",
  appId: "1:604146670792:web:9079cb003de564a2e059fd",
};

initializeApp(firebaseConfig);

createApp(App).use(store).use(router).mount("#app");
