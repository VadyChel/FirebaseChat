<template>
  <div>
    <form @keydown.prevent.enter="createMessage" class="create-message-form">
      <input ref="createMessageInput" type="text" v-model="messageText" class="create-message-input" placeholder="Enter text"/>
<!--      <button type="button" @click.prevent="createMessage" class="create-message-button"><span style="transform: rotate(-45deg);" class="mdi mdi-send"></span></button>-->
    </form>
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
      })

      this.messageText = ''
    },
  },
};
</script>

<style scoped>
.create-message-form {
  display: flex;
  width: clamp(400px, 60vw, 600px);
  position: fixed;
  bottom: 0;
  padding: 0 2em;
}

.create-message-input {
  width: 100%;
  border-radius: 15px;
  border: none;
  padding: 10px 20px;
  margin-bottom: 2%;
}

.create-message-button {
  height: 48px;
  width: 48px !important;
  border-radius: 50%;
  border: none;
  background-color: #fff;
  color: #1e1e1e;
  font-size: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.create-message-button span {
  transform: rotate(-45deg);
  transform-origin: 45% 45%;
}
</style>
