<template>
  <div id="page">
    <Header/>

    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import { getAuth } from "firebase/auth";

export default {
  components: { Header },
  mounted() {
    const auth = getAuth()
    if (this.$route.path !== "/login" && !auth.currentUser) {
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
  color: #fff;
  background-color: #333;
}

#page {
  background-color: var(--blue-color);
  height: 100vh;
  overflow: hidden;
  width: clamp(400px, 60vw, 600px);
  position: relative;
}
</style>
