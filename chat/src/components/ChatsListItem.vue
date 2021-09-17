<template>
  <div>
    <router-link class="chat-container" :to="`/chat/${value.id}`">
      <span class="chat-name" >{{ value.name }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ChatsListItem",
  props: ["value"],
};
</script>

<style scoped>
.chat-container {
  display: flex;
  align-items: center;
  padding: 20px;
  width: 100%;
  border-radius: 10px;
  transition: 0.2s;
  color: var(--light-color);
  text-decoration: none !important;
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 2%;
  background-color: var(--dark-blue-color);
}

.chat-container:hover {
  background-color: var(--light-color);
  color: var(--dark-blue-color);
}
</style>
