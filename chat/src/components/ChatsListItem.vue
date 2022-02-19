<template>
  <div class="chat-container">
    <div v-if="!editingMode">
      <router-link :to="`/chat/${value.id}`" class="chat-name" >{{ value.name }}</router-link>
    </div>

    <div v-else class="editing-mode">
      <input type="text" class="editing-input" v-model='newText'/>

      <div class="editing-buttons">
        <button class="button cancel-editing-button" type="button" @click="editingMode = false">Cancel</button>
        <button class="button" type="button" @click="editChat">Save</button>
      </div>
    </div>
    <span class="spacer"></span>

    <div v-if="auth.currentUser.uid === value.authorId">
      <span @click="editingMode = true" class="chat-icon chat-icon-edit mdi mdi-pencil"></span>
      <span @click="deleteChat" class="chat-icon chat-icon-delete mdi mdi-delete"></span>
    </div>
  </div>
</template>

<script>
import { getAuth } from 'firebase/auth'
import { deleteDoc, doc, getFirestore, updateDoc } from 'firebase/firestore'

export default {
  name: "ChatsListItem",
  props: ["value"],
  data: () => ({
    newText: '',
    editingMode: false
  }),
  computed: {
    auth () {
      return getAuth()
    }
  },
  methods: {
    async deleteChat () {
      const db = getFirestore()
      await deleteDoc(doc(db, 'chats', this.value.id))
    },
    async editChat () {
      const db = getFirestore()
      await updateDoc(doc(db, 'chats', this.value.id), { name: this.newText })
      this.editingMode = false
      this.newText = this.value.text
    }
  }
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

.chat-icon {
  font-size: 0.9em;
}

.chat-icon-delete:hover {
  color: red;
}

.chat-icon-edit:hover {
  color: darkorange;
}

.chat-name {
  color: var(--light-color);
  transition: 0.2s;
  text-decoration: none;
}

.chat-name:hover {
  color: darkorange !important;
}

.chat-container:hover .chat-name {
  color: var(--dark-blue-color);
}

.cancel-editing-button {
  margin-right: 6px;
}

.editing-mode {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.editing-buttons {
  display: flex;
  margin-top: 10px;
}

.editing-input {
  margin-right: 10px;
  border-radius: var(--border-radius);
  border: none;
  background-color: var(--blue-color);
  padding: 5px 10px;
  font-size: 1.4rem;
  color: #fff;
  font-weight: bold;
  transition: 0.2s;
}

.editing-input:focus {
  background-color: #23274a;
}

.editing-input:focus-visible{
  outline: none;
}
</style>
