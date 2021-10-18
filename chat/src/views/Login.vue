<template>
  <div style="margin: 50% 0; display: flex; justify-content: center">
    <button class="login-button" type="button" @click="signInWithGoogle">Sign in With Google</button>
  </div>
</template>

<script>
import {getAuth, setPersistence, browserLocalPersistence, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

export default {
  name: "Login",
  methods: {
    signInWithGoogle() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      setPersistence(auth, browserLocalPersistence).then(() => {
        signInWithPopup(auth, provider).then(() => {
          this.$router.push({path: "/"})
        });
      })
    },
  },
};
</script>

<style scoped>
.login-button {
  border: none;
  padding: 10px;
  border-radius: 10px;
  background-color: var(--dark-blue-color);
  color: #ffffff;
}
</style>
