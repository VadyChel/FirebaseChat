<template>
  <div>
    <ChatPageHeader/>

    <div class="chat-messages" ref="messages">
      <div v-for="message of messages" :key="message.id">
        <Message :ref="message.id"  :value="message" />

        <div v-if="checkIfMessageLastOfDay(message)" style="position:relative;">
          <hr  class="message-divider"/>
          <span style="position: absolute; top: -10px">{{ getTimeOnDivider(message.createdAt.toDate()) }}</span>
        </div>
      </div>
    </div>

    <CreateMessageForm/>

    <button type="button" class="go-to-down">
      <span class="mdi mdi-arrow-down"></span>
    </button>
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
  name: "ChatPage",
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
      const lastMessageRef = this.$refs[this.messages[this.messages.length - 1].id]
      if (lastMessageRef) {
        lastMessageRef.$el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  },
  methods: {
    goToDown () {

    },
    getTimeOnDivider (time) {
      time.setDate(time.getDate()+1)
      return time.toLocaleDateString('en-GB', {
        timeZone: 'UTC',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      })
    },
    checkIfMessageLastOfDay (message) {
      const nextMessage = this.messages[this.messages.indexOf(message)+1]
      if (!nextMessage) {
        return
      }
      return nextMessage.createdAt.toDate().getDate() > message.createdAt.toDate().getDate()
    }
  },
  computed: {
    showGoToDownButton () {

    }
  }
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

.go-to-down {
  position: absolute;
  bottom: 10%;
  right: 4%;
  font-size: 40px;
  border-radius: 50%;
  background-color: #428df5;
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  color: #fff;
  box-shadow: #428df5 0 0 15px;
  border: none;
}

.go-to-down:hover {
  background-color: #427bf5;
  box-shadow: #427bf5 0 0 30px;
}

.message-divider {
  border-top: 1px solid var(--light-color);
}
</style>
