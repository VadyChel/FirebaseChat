<template>
  <div>
    <input type="text" v-model="messageText" />
    <button type="button" @click="createMessage">Send</button>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  Timestamp,
} from "firebase/firestore";

export default {
  name: "CreateMessageForm",
  data: () => ({
    messageText: "",
  }),
  computed: {
    auth() {
      return getAuth();
    },
  },
  methods: {
    async createMessage() {
      const db = getFirestore();
      await addDoc(collection(db, "messages"), {
        text: this.messageText,
        createdAt: Timestamp.now(),
        avatarUrl: this.auth.currentUser.photoURL,
        type: "0",
        chatId: this.$route.params.chatId,
        authorId: this.auth.currentUser.uid,
      });
    },
  },
};
</script>

<style scoped></style>
