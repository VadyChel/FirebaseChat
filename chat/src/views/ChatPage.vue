<template>
  <div>
    <ChatPageHeader/>

    <div class="chat-messages">
      <Message v-for="message of messages" :key="message.id" :value="message" />
    </div>

    <CreateMessageForm/>
  </div>
</template>

<script>
import Message from "../components/Message";
import {
  getFirestore,
  query,
  orderBy,
  limit,
  collection,
  onSnapshot,
  where,
} from "firebase/firestore";
import ChatPageHeader from "../components/ChatPageHeader";
import CreateMessageForm from "../components/CreateMessageForm";

export default {
  name: "Login",
  data: () => ({
    messages: [],
  }),
  components: { CreateMessageForm, Message, ChatPageHeader },
  async mounted() {
    const db = getFirestore();
    const messagesCollection = collection(db, "messages");
    const messagesQuery = query(
      messagesCollection,
      orderBy("createdAt"),
      limit(100),
      where("chatId", "==", this.$route.params.chatId)
    );

    onSnapshot(messagesQuery, { includeMetadataChanges: true }, (docs) => {
      this.messages = docs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });
  },
};
</script>

<style scoped>
.chat-messages {
  overflow-y: auto; 
  height: 75vh;
  padding: 0 2em;
  margin-top: 4%;
}

.chat-messages::-webkit-scrollbar {
  width: 10px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background-color: #1e1e1e;
  border-radius: 100px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background-color: #fff;
}
</style>
