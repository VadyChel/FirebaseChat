<template>
  <div class="header">
    <div class="header-buttons">
      <router-link class="header-button" to="/">Home</router-link>
      <router-link class="header-button" to="/login" v-if="!auth">Login</router-link>
      <button class="header-button" type="button" v-if="auth" @click="signOut">Logout</button>
    </div>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";

export default {
  name: "Header",
  computed: {
    auth () {
      return getAuth()
    }
  },
  methods: {
    signOut () {
      this.auth.signOut()
    }
  }
};
</script>

<style scoped>
.header {
  background-color: var(--light-color);
  padding: 0 2em;
}

.header-buttons {
  display: flex;
  align-items: center;
  justify-content: start;
}

.header-button {
  text-decoration: none;
  color: var(--dark-blue-color);
  background-color: var(--light-color);
  border: none;
  padding: 0.75em;
  font-size: 1.25em;
  transition: 0.2s;
}

.header-button:hover {
  background-color: var(--dark-blue-color);
  color: var(--light-color);
}
</style>
