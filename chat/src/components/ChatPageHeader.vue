<template>
<div>
  <div class="chat-header">
    <div class="chat-header-buttons">
      <router-link class="chat-header-button" :to="`/createInvite/${$route.params.chatId}`">Invite</router-link>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "ChatPageHeader"
}
</script>

<style scoped>
.chat-header {
  background-color: var(--light-color);
  padding: 0 2em;
  border-top: thin var(--dark-blue-color) solid;
}

.chat-header-buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.chat-header-button {
  text-decoration: none;
  color: var(--dark-blue-color);
  background-color: var(--light-color);
  border: none;
  padding: 0.5em;
  font-size: 1em;
  transition: 0.2s;
}

.chat-header-button:hover {
  background-color: var(--dark-blue-color);
  color: var(--light-color);
}
</style>