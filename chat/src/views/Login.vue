<template>
  <div>
    <button type="button" @click="signInWithGoogle">Sign in With Google</button>
  </div>
</template>

<script>
import {getAuth, setPersistence, browserLocalPersistence, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

export default {
  name: "Login",
  mounted() {
    console.log('page2')
  },
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

<style scoped></style>
