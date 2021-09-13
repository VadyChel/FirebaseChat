<template>
  <div>
    <input type="text" v-model="chatName" />
    <button type="button" @click="createChat">Create</button>
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

<style scoped></style>
