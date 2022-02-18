<template>
  <div>
    <form @keydown.prevent.enter="createMessage" class="create-message-form">
      <input ref="createMessageInput" type="text" v-model="messageText" class="create-message-input" placeholder="Enter text"/>
      <button type="button" @click.prevent="createMessage" class="create-message-button"><span style="transform: rotate(-45deg);" class="mdi mdi-send"></span></button>
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
      const text = (' ' + this.messageText).slice(1);
      this.messageText = ''

      const db = getFirestore();
      await addDoc(collection(db, "messages"), {
        text,
        createdAt: Timestamp.now(),
        avatarUrl: this.auth.currentUser.photoURL,
        type: "0",
        chatId: this.$route.params.chatId,
        authorId: this.auth.currentUser.uid,
      })
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
  flex: 1 1 auto;
  margin-right: 10px;
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
  transition: 0.2s;
}

.create-message-button:focus{
  border: 4px solid #23274a;
}

.create-message-button span {
  transform: rotate(-45deg);
  transform-origin: 45% 45%;
  color: var(--dark-blue-color);
  transition: 0.2s;
}

.create-message-button:hover {
  background-color: var(--dark-blue-color);
}

.create-message-button:hover > span{
  color: var(--light-color);
}
</style>
