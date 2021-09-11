<template>
  <div>
    <div>
      <Message v-for="message of messages" :key="message.id" :value="message" />
    </div>

    <CreateMessageForm />
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
import CreateMessageForm from "../components/CreateMessageForm";

export default {
  name: "Login",
  data: () => ({
    messages: [],
  }),
  components: { CreateMessageForm, Message },
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

<style scoped></style>
