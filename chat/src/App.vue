<template>
  <div id="page">
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link>
    <router-view />
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";

export default {
  computed: {
    auth() {
      return getAuth();
    },
  },
  mounted() {
    if (this.$route.path !== "/login" && !this.auth.currentUser) {
      this.$router.push({ path: "/login" });
    }
  },
};
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #333;
}

#page {
  background-color: #333b66;
  height: 100vh;
  width: clamp(400px, 60vw, 600px);
  position: relative;
}
</style>
