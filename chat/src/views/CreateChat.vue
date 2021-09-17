<template>
  <div style="margin: 50% 0; display: flex; justify-content: center">
    <input type="text" v-model="chatName" class="chat-input" placeholder="Enter Chat Name" />
    <button type="button" @click="createChat" class="create-chat-button">Create</button>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

export default {
  name: "CreateChat",
  data: () => ({
    chatName: "",
  }),
  computed: {
    auth() {
      return getAuth();
    },
  },
  methods: {
    async createChat() {
      const db = getFirestore();
      const newChat = await addDoc(collection(db, "chats"), {
        name: this.chatName,
        authorId: this.auth.currentUser.uid,
        members: [this.auth.currentUser.uid]
      });
      this.$router.push({ path: `/chat/${newChat.id}` });
    },
  },
};
</script>

<style scoped>
.chat-input {
  width: clamp(200px, 40vw, 400px);
  display: flex;
  padding: 10px;
  background-color: var(--dark-blue-color);
  font-size: 1em;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  border: none;
  color: var(--light-color);
  transition: 0.2s;
}

.chat-input:focus {
  background-color: #23274a;
}

.chat-input:focus-visible {
  outline: none;
}

.create-chat-button {
  padding: 10px;
  font-size: 1em;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  border: none;
  color: var(--dark-blue-color);
  background-color: var(--light-color);
}

</style>
