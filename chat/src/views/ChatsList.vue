<template>
  <div>
    <div class="chats">
      <Chat :value="chat" v-for="chat of chats" :key="chat.id" />
    </div>
    <router-link to="/new" class="new-chat-button"
      ><span class="mdi mdi-plus"></span
    ></router-link>
  </div>
</template>

<script>
import Chat from "../components/Chat";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  limit,
  where,
} from "firebase/firestore";

export default {
  name: "Login",
  data: () => ({
    chats: [],
  }),
  components: { Chat },
  computed: {
    auth() {
      return getAuth();
    },
  },
  mounted() {
    const db = getFirestore();
    const chatsCollection = collection(db, "chats");
    const chatsQuery = query(
      chatsCollection,
      limit(25),
      where("userId", "==", this.auth.currentUser.uid)
    );
    onSnapshot(chatsQuery, { includeMetadataChanges: true }, (snapshot) => {
      this.chats = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });
  },
};
</script>

<style scoped>
.new-chat-button {
  position: absolute;
  bottom: 4%;
  right: 4%;
  font-size: 56px;
  border-radius: 50%;
  background-color: #428df5;
  height: 64px;
  width: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  color: #fff;
  box-shadow: #428df5 0 0 15px;
}

.new-chat-button:hover {
  background-color: #427bf5;
  box-shadow: #427bf5 0 0 30px;
}
</style>
