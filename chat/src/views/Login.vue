<template>
  <div>
    <button type="button" @click="signInWithGoogle">Sign in With Google</button>
  </div>
</template>

<script>
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default {
  name: "Login",
  methods: {
    signInWithGoogle() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then(() =>
        this.$router.push({ path: "/" })
      );
    },
  },
};
</script>

<style scoped></style>
